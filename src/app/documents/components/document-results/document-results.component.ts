import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { DocumentsService } from 'src/app/services/documents.service';
import { DocumentBuilder } from 'src/app/new-document/models/document-builder.interface';
import { DocumentPass } from 'src/app/new-document/models/document-pass.interface';
import { UserAnswer } from 'src/app/new-document/models/user-answer.interface';
import { DocumentType } from 'src/app/new-document/models/document-type.interface';
import { ToastrService } from 'ngx-toastr';
import { MatIconRegistry } from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-document-results',
  templateUrl: './document-results.component.html',
  styleUrls: ['./document-results.component.scss']
})
export class DocumentResultsComponent implements OnInit {

  questions = [];
  editMode: boolean;
  document: DocumentBuilder;
  documentPass: DocumentPass;
  DocumentType = DocumentType;
  documentAnswerId: number;

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private documentService: DocumentsService,
    private spinner: SpinnerService) { }

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
    });
    this.setIcons();
  }

  setIcons() {
    this.iconRegistry.addSvgIcon('arr-left', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/left-arrow.svg'));
  }

  getDocumentById(id) {
    this.spinner.show();
    this.documentService.getStructure(id)
      .subscribe((response) => {
        this.document = response['message'];
        this.spinner.hide();
        this.documentService.getUserDocumentAnswer(this.documentAnswerId)
          .subscribe((data) => {
            this.documentPass = data['message'];
            if (this.documentPass.userAnswers) {
              this.initDocumentPass(this.documentPass);
            }
          }, () => this.spinner.hide());
      }, () => this.spinner.hide());
  }

  initDocumentPass(results) {
    this.documentPass = {
      documentId: this.document.id,
      documentName: this.document.title,
      questionAnswers: this.initUserAnswers(results),
      uuid: results.uuid
    };
  }

  initUserAnswers(results): UserAnswer[][] {
    return this.document.questions.map((question) => {
      const questionAnswers = [];
      question.answers.forEach(element => {

        const answer = results.userAnswers.find((answer) => answer.answerId === element.id);
        if (answer) {
          questionAnswers.push(answer);
        } else {
          questionAnswers.push({
            answerId: element.id,
            rating: 0,
            text: ''
          });
        }
      });
      return [ ... questionAnswers];
    });
  }

  copyClipboard(uuid) {
    uuid.select();
    document.execCommand('copy');
    uuid.setSelectionRange(0, 0);
    this.toastr.success('Coppied to clipboard: ' + uuid.value);
  }

  hasQuestionAnswers(index) {
    return this.documentPass.questionAnswers[index].some((answer) => !!answer['id'] || answer['id'] === 0);
  }
}
