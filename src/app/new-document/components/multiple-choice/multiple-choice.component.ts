import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {QuestionAnswer} from '../../models/document-answer.interface';
import {UserAnswer} from '../../models/user-answer.interface';

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.scss']
})
export class MultipleChoiceComponent implements OnInit, OnChanges {
  @Input() previewMode: boolean = false;
  @Input() answers: UserAnswer[];
  @Input() questions: QuestionAnswer[];
  @Input() type: 'radio' | 'checkbox';
  @Output() onPush = new EventEmitter();
  @Output() onRemove = new EventEmitter();
  @Output() onValid = new EventEmitter();

  answersBool = [];
  radioValue;

  constructor() { }

  ngOnInit() {
  }


  ngOnChanges() {
    if (this.answers && this.answers.length) {
      this.answers.forEach( (answer) => this.answersBool.push(!!answer.id || answer.id === 0));

      const radioObj = this.questions.find( (answer, index) => this.answersBool[index]);
      this.radioValue = radioObj ? radioObj.answerText : '';
    }
  }

  onFocus(index: number, array: Array<any>) {
    if (index === (array.length - 1)) {
      this.onPush.emit();
    }
  }

  trackValid() {
    if (this.previewMode) {
      let valid = false;

      if (this.type === 'radio') {
        valid = !!this.radioValue;
      } else {
        valid = this.questions.some((question, index) => this.answersBool[index]);
      }

      this.onValid.emit({valid});
      this.onClick();
    }
  }

  onClick() {
    if (this.type === 'radio') {
      const index = this.questions.findIndex(question => question.answerText === this.radioValue);

      this.answers[index].rating = -1;
      this.answers.forEach((answer, i) => {
        if (i !== index) {
          answer.rating = 0;
        }
      });
    } else {
      this.answers.forEach((answer, i) => {
        answer.rating = this.answersBool[i] ? -1 : 0;
      });
    }
  }

  isQuestionValid() {
    this.questions.forEach((item, index, arr) => {
      item.answerText = this.isAnswerTextDuplicated(item, index, arr) ? '' : item.answerText;
    });
  }

  isAnswerTextDuplicated(item, index, arr) {
    return arr.some((obj, i) => index !== i &&
      item.answerText && obj.answerText &&
      obj.answerText.toLocaleLowerCase() === item.answerText.toLocaleLowerCase());
  }
}
