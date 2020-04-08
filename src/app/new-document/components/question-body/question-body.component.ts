import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuestionType } from '../../models/question-type.interface';
import { QuestionAnswer } from '../../models/document-answer.interface';
import { UserAnswer } from '../../models/user-answer.interface';
import { TEXT_FIELD } from '../../models/field-validation.interface';

@Component({
  selector: 'app-question-body',
  templateUrl: './question-body.component.html',
  styleUrls: ['./question-body.component.scss']
})
export class QuestionBodyComponent implements OnInit {

  @Input() type: QuestionType;
  @Input() questionIndex: number;
  @Input() previewMode: boolean = false;
  @Input() answers: UserAnswer[];
  @Input() questions: QuestionAnswer[];
  @Output() onRemoveAnswer = new EventEmitter();
  QuestionType = QuestionType;
  
  constructor() { }

  ngOnInit() {
    if (!this.questions || !this.questions.length) {
      this.initQuestions();
    }
    if (!this.answers || !this.answers.length) {
      this.initAnswers();
    }
  }

  private initQuestions() {
    switch (this.type) {
      case QuestionType.SINGLE_TEXTBOX:
      case QuestionType.COMMENT_BOX:
      case QuestionType.FILE_UPLOAD:
      case QuestionType.SLIDER: {
        this.pushNewQuestion();
        break;
      }
      case QuestionType.MULTIPLE_CHOICE:
      case QuestionType.CHECKBOXES:
      case QuestionType.STAR_RATING:
      case QuestionType.RANKING:
      case QuestionType.DROPDOWN: {
        this.pushNewQuestion();
        this.pushNewQuestion();
        this.pushNewQuestion();
        break;
      }
      case QuestionType.MULTIPLE_TEXTBOXES: {
        this.pushNewQuestion();
        this.pushNewQuestion();
        break;
      }
      case QuestionType.DATE_TIME: {
        this.pushNewDataTimeAnswer();
      }
    }
  }

  initAnswers() {
    this.answers = [];
    this.questions.forEach((question) => {
      this.pushNewAnswer();
    });
  }

  pushNewDataTimeAnswer() {
    this.questions.push({
      type: this.type,
      answerText: '',
      placeOrder: this.questions.length,
      dateFormat: 'DD_MM_YYYY',
      startPoint: 0
    });
  }

  pushNewQuestion() {
    const fieldType = this.type === QuestionType.FILE_UPLOAD ? TEXT_FIELD.UPLOAD_FILE_FIELD : TEXT_FIELD.TEXT_FIELD;
    const max = this.type === QuestionType.FILE_UPLOAD ? 5 : this.type === QuestionType.COMMENT_BOX ? 2000 : 255;
    this.questions.push( {
      type: this.type,
      answerText: '',
      placeOrder: this.questions.length,
      startPoint: 0,
      valid: true,
      fieldValidation: {
        min: 0,
        max,
        fieldType,
        maxSizeOfFile: 20
      }
    });
  }

  pushNewAnswer() {
    this.answers.push({
      text: '',
      rating: 0
    });
  }

  removeAnswer(answerIndex: number) {
    this.onRemoveAnswer.emit({
      questionIndex: this.questionIndex,
      answerIndex
    });
  }

  onFocus(index: number, array: Array<any>) {
    if (index === (array.length - 1)) {
      this.pushNewQuestion();
    }
  }
}
