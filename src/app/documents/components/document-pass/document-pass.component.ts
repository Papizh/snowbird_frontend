import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DocumentsService} from 'src/app/services/documents.service';
import {SpinnerService} from 'src/app/shared/services/spinner.service';
import {ScrollToService} from '@nicky-lenaers/ngx-scroll-to';
import {DocumentBuilder} from 'src/app/new-document/models/document-builder.interface';
import {ToastrService} from 'ngx-toastr';
import {DocumentPass} from 'src/app/new-document/models/document-pass.interface';
import {UserAnswer} from 'src/app/new-document/models/user-answer.interface';
import {QuestionType} from 'src/app/new-document/models/question-type.interface';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-document-pass',
  templateUrl: './document-pass.component.html',
  styleUrls: ['./document-pass.component.scss']
})
export class DocumentPassComponent implements OnInit {
  questions = [];
  editMode: boolean;
  document: DocumentBuilder;
  documentPass: DocumentPass;
  documentAnswerId: number;
  assignmentId: number;
  score = 0;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private changeDetectorRef: ChangeDetectorRef,
    private documentService: DocumentsService,
    private _scrollToService: ScrollToService,
    private toastr: ToastrService,
    private spinner: SpinnerService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params.id;
      this.editMode = !!id;
      if (this.editMode) {
        this.getDocumentById(id);
      }
    });
    this.route.queryParams.subscribe((params) => {
      this.documentAnswerId = +params.id;
      this.assignmentId = +params.assignmentId;
    });

  }

  setIcons() {
    this.iconRegistry.addSvgIcon('arr-left', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/left-arrow.svg'));
  }

  getDocumentById(id) {
    this.spinner.show();
    this.documentService.getStructure(id)
      .subscribe((data) => {
        this.document = data['message'];
        this.spinner.hide();
        this.initDocumentPass();
      });
  }

  changes($event) {
    const el = $event.target;
    this.score = el.scrollTop / (el.scrollHeight - el.offsetHeight) * 100;
    this.changeDetectorRef.detectChanges();
  }

  next(index) {
    const offset = -window.innerHeight / 2 + 100;
    this._scrollToService.scrollTo({
      target: `question-${index + 1}`,
      offset,
      duration: 200
    });
  }

  finishQuiz() {

    this.filterNegativeItems();
    const document = {...this.documentPass};
    delete document.questionAnswers;
    document.id = this.documentAnswerId;
    this.spinner.show();
    this.documentService.createDocumentAnswer(document)
      .subscribe((data) => {
          this.router.navigate(['/main/users/profile/assignments']);
          this.toastr.success(data['message']);
        });
  }

  filterNegativeItems() {
    this.documentPass.userAnswers = [];
    this.documentPass.questionAnswers.forEach((items, index) => {
      switch (this.document.questions[index].type) {
        case QuestionType.DROPDOWN:
        case QuestionType.MULTIPLE_CHOICE:
        case QuestionType.CHECKBOXES:
        case QuestionType.STAR_RATING: {
          this.documentPass.questionAnswers[index] = items.filter((item) => {
            if (item.rating === -1) {
              delete item.rating;
              return true;
            }
            return false;
          });
        }
      }
      this.documentPass.userAnswers.push(...this.documentPass.questionAnswers[index]);
    });
  }

  initDocumentPass() {
    this.documentPass = {
      documentId: this.document.id,
      documentName: this.document.title,
      assignmentId: this.assignmentId,
      questionAnswers: this.initUserAnswers(),
    };
  }

  initUserAnswers(): UserAnswer[][] {
    return this.document.questions.map((question) => {
      const questionAnswers = [];

      question.answers.forEach(element => {
        questionAnswers.push({
          answerId: element.id,
          rating: 0,
          text: ''
        });
      });
      return [...questionAnswers];
    });
  }

  public isUnasweredSomeRequiredQuestion(): boolean {
    return this.document.questions.some( (question) => question.required && !question.answered);
  }

  public isSomeQuestionWithInvalidAnswers(): boolean {
    return this.document.questions.some( (question) => question.answers.some((answer) => answer.valid === false));
  }
}
