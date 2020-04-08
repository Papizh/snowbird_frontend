import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { QuestionAnswer } from '../../models/document-answer.interface';
import { UserAnswer } from '../../models/user-answer.interface';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit, OnChanges {

  @Input() answers: UserAnswer[];
  @Input() questions: QuestionAnswer[];
  @Input() previewMode: boolean = false;
  @Output() onPush = new EventEmitter();
  @Output() onRemove = new EventEmitter();
  @Output() onValid = new EventEmitter();

  activeDropdown;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.answers && this.answers.some( (answer) => !!answer.id)) {
      this.setResult();
    }
  }

  setResult() {
    const answerItem: UserAnswer = this.answers.find((answer) => (!!answer.id || answer.id === 0));
    this.activeDropdown = this.questions.find( (question) => question.id === answerItem.answerId).answerText;
  }

  onFocus(index: number, array: Array<any>) {
    if (index === (array.length - 1)) {
      this.onPush.emit();
    }
  }

  selectionChange() {
    this.trackValid();
    this.onClick();
  }

  trackValid() {
    let valid = false;
    valid = !!this.activeDropdown;
    this.onValid.emit({valid});
  }

  onClick(){
    const index = this.questions.findIndex(question => question.answerText === this.activeDropdown);
    this.answers[index].rating = -1;
    this.answers.forEach((answer, i) => {
      if (i != index) {
        answer.rating = 0;
      }
    });
  }
}
