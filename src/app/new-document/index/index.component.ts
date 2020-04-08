import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {NewDocumentService} from '../services/new-document.service';

import {DocumentType} from '../models/document-type.interface';
import {QuestionType} from '../models/question-type.interface';
import {DocumentQuestion} from '../models/document-question.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {SpinnerService} from 'src/app/shared/services/spinner.service';
import {ToastrService} from 'ngx-toastr';
import {DocumentBuilder} from '../models/document-builder.interface';
import * as _ from 'lodash';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  @ViewChild('documentFormElement') documentForm: ElementRef;

  previewMode: boolean;
  editMode: boolean;
  complaintType: boolean = false;
  questionTypes: Array<any>;

  public document: DocumentBuilder;
  public oldVersion: DocumentBuilder;

  constructor(private newDocumentService: NewDocumentService,
              private route: ActivatedRoute,
              private router: Router,
              private toaster: ToastrService,
              private changeDetectionRef: ChangeDetectorRef,
              private spinner: SpinnerService) {
  }

  ngOnInit() {
    this.editMode = false;
    this.questionTypes = this.newDocumentService.getQuestionTypes();
    this.getIdfromParams();
    this.spinner.show();
  }

  getIdfromParams() {
    this.route.params.subscribe((params) => {
      const id = params.id;
      this.editMode = !!id;
      if (this.editMode) {
        this.getDocumentById(id);
      } else {
        this.spinner.hide();
        this.document = this.initDocumentBuilder();
      }
    });
  }

  getDocumentById(id) {
    this.spinner.show();
    this.newDocumentService.getStructure(id)
      .subscribe((data) => {
        this.spinner.hide();
        this.document = data['message'];
        this.document.questions = this.filterDeleted(this.document.questions);
        this.oldVersion = JSON.parse(JSON.stringify(this.document));
        this.complaintType = this.document.documentInfo.documentType === DocumentType.COMPLAINT;

        if (this.document.documentInfo.published) {
          this.toaster.warning('This document is already published. You cannot edit it anymore!');
        }
        if (this.isModeratorAndDocumentIsGlobal()) {
          this.toaster.warning('This document is global. You cannot edit or publish it!');
        }
      }, () => this.spinner.hide());
  }


  private filterDeleted(questions): DocumentQuestion[] {
    return questions.filter((question) => !question.delete);
  }

  public getQuestionIndex(index: number): number {
    const indexInArray = index;
    this.document.questions.forEach((question, questionIndex) => {
      if (question.delete && questionIndex < indexInArray) {
        index--;
      }
    });
    return index + 1;
  }

  private initDocumentBuilder(): DocumentBuilder {
    const global = localStorage.getItem('User-Role') === 'ROLE_ADMINISTRATOR';

    const document: DocumentBuilder = {
      title: '',
      questions: [],
      organizationId: 0,
      global,
      documentInfo: {
        documentType: DocumentType.REGULAR_DOCUMENT
      }
    };
    return document;
  }

  public saveDocument() {
    this.deleteInvalidFromAnswer();
    this.filterEmptyAnswers();
    this.handlePlaceOrderOfDocumentQuestions();
    this.spinner.show();
    const method = this.editMode ? 'edit' : 'create';
    this.newDocumentService[method](this.document)
      .subscribe((data) => {
        this.documentForm.nativeElement.reset();
        this.spinner.hide();
        const id = data['message'];
        if (!this.editMode) {
          this.toaster.success('Document was created successfully');
          this.router.navigate(['/new-document/', id, 'edit']);
        } else {
          this.toaster.success('Document was updated successfully');
          this.ngOnInit();
        }
      }, (error) => {
      });
  }

  public publishDocument() {
    this.spinner.show();
    this.newDocumentService.publish(this.document.id)
      .subscribe((data) => {
        this.spinner.hide();
        this.toaster.success(data['message']);
        this.redirectToDocuments();
      }, (error) => {
      });
  }

  public filterEmptyAnswers() {
    this.document.questions.forEach((item, questionIndex) => {
      if (item.answers.length > 1 && item.type !== QuestionType.STAR_RATING) {
        if (item.answers.every((answer) => !answer.answerText)) {
          this.onRemoveQuestion(questionIndex);
          return;
        }

        while (item.answers.some((answer) => !answer.answerText)) {
          let deleted = false;
          item.answers.forEach((answer, answerIndex) => {
            if (!answer.answerText && !deleted && answer.type !== QuestionType.STAR_RATING) {
              this.onRemoveAnswer({questionIndex, answerIndex});
              deleted = true;
            }
          });
        }
      }
    });
  }

  public redirectToDocuments() {
    this.router.navigate(['/main/documents']);
  }

  private handlePlaceOrderOfDocumentQuestions() {
    this.setArrayPlaceOrder(this.document.questions);
    this.document.questions.forEach(item => {
      if (item.type !== QuestionType.SLIDER) {
        this.setArrayPlaceOrder(item.answers);
      }
    });
  }

  private setArrayPlaceOrder(array: Array<any>) {
    array = array
      .filter((item) => !item.delete)
      .map((item, index) => {
        item.placeOrder = index + 1;
        return item;
      });
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer !== event.container) {
      this.document.questions.push({
        questionText: '',
        required: false,
        type: this.questionTypes[event.previousIndex].type,
        answers: [],
      });
    }
  }

  dropQuestion(event: CdkDragDrop<DocumentQuestion[]>) {
    if (event.previousContainer !== event.container) {
      for (let i = this.document.questions.length; i >= event.currentIndex; i--) {
        this.document.questions[i] = this.document.questions[i - 1];
      }
      this.document.questions[event.currentIndex] = {
        questionText: '',
        required: false,
        type: this.questionTypes[event.previousIndex].type,
        answers: [],
      };
    } else if (event.previousContainer === event.container) {
      moveItemInArray(
        this.document.questions,
        event.previousIndex,
        event.currentIndex);
    }
    this.changeDetectionRef.detectChanges();
  }

  getFormItemByType(formType) {
    return this.questionTypes.find((item) => item.type === formType);
  }

  onRemoveQuestion(index: number) {
    this.document.questions[index].delete = true;
    if (!this.document.questions[index].id) {
      this.document.questions = this.document.questions
        .filter((item) => !(item.delete && !item.id));
    }
  }

  onRemoveAnswer({questionIndex, answerIndex}) {
    this.document.questions[questionIndex].answers[answerIndex].delete = true;
    if (!this.document.questions[questionIndex].answers[answerIndex].id) {
      this.document.questions[questionIndex].answers = this.document.questions[questionIndex].answers
        .filter((item) => !(item.delete && !item.id));
    }
  }

  isSaveDisabled() {
    return !this.document ||
      !this.document.questions ||
      !this.document.questions.filter((q) => !q.delete).length ||
      !this.document.title ||
      this.isModeratorAndDocumentIsGlobal() ||
      !this.checkDiff() ||
      this.document.documentInfo.published ||
      this.document.questions.some(question => !question.questionText) ||
      this.isSomeQuestionWithEmptyAnswers() ||
      this.isSomeQuestionAnswesWithEmptyValidation();
  }

  private isSomeQuestionWithEmptyAnswers() {
    return this.document.questions
      .filter((question) => question.answers.length > 1 && question.type !== QuestionType.STAR_RATING)
      .some((question) => question.answers.every((answer) => !answer.answerText));
  }

  private isSomeQuestionAnswesWithEmptyValidation() {
    return this.document.questions
      .filter( (question) => question.type === QuestionType.SINGLE_TEXTBOX
        || question.type === QuestionType.COMMENT_BOX
        || question.type === QuestionType.MULTIPLE_TEXTBOXES
        || question.type === QuestionType.FILE_UPLOAD)
      .some((question) => question.answers.every((answer) =>
        !answer.fieldValidation
        || answer.fieldValidation.min === undefined
        || answer.fieldValidation.max === undefined
        || answer.endPoint === null
        || answer.startPoint === null
        || answer.fieldValidation.maxSizeOfFile === null
        || answer.fieldValidation.max === null
        || answer.fieldValidation.min === null
        || !answer.fieldValidation.fileExtensions
        || answer.fieldValidation.min > answer.fieldValidation.max))
        ||
        this.document.questions
        .filter( (question) => question.type === QuestionType.SLIDER)
        .some((question) => question.answers.every((answer) =>
          answer.endPoint === null
          || answer.startPoint === null
          || answer.startPoint > answer.endPoint));
  }

  isModeratorAndDocumentIsGlobal() {
    const role = localStorage.getItem('User-Role');
    const isDocumentGlobal = this.document.global;

    return role === 'ROLE_ORGANIZATION_MODERATOR' && isDocumentGlobal;
  }

  deleteInvalidFromAnswer() {
    this.document.questions.forEach(question => question.answers.forEach((answer) =>
      delete answer.valid));
  }

  getPublishDisabled() {
    return !this.document ||
      !this.document.id ||
      this.document.documentInfo.published ||
      this.isModeratorAndDocumentIsGlobal() ||
      this.checkDiff();
  }

  checkDiff(): boolean {
    return !_.isEqual(this.document, this.oldVersion);
  }

  public toggleDocumentType(value) {
    this.complaintType = value;
    const typeIndex = this.complaintType ? DocumentType.COMPLAINT : DocumentType.REGULAR_DOCUMENT;
    this.document.documentInfo.documentType = DocumentType[typeIndex];
  }
}
