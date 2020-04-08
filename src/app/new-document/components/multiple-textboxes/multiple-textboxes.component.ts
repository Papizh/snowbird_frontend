import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuestionAnswer } from '../../models/document-answer.interface';
import { UserAnswer } from '../../models/user-answer.interface';

@Component({
  selector: 'app-multiple-textboxes',
  templateUrl: './multiple-textboxes.component.html',
  styleUrls: ['./multiple-textboxes.component.scss']
})
export class MultipleTextboxesComponent implements OnInit {
  
  @Input() answers: UserAnswer[];
  @Input() questions: QuestionAnswer[];
  @Input() previewMode: boolean = false;
  @Output() onPush = new EventEmitter();
  @Output() onRemove = new EventEmitter();
  @Output() onValid = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onFocus(index: number, array: Array<any>) {
    if (index === (array.length - 1)) {
      this.onPush.emit();
    }
  }

  trackValid({valid}, item) {
    item.valid = valid;
    const validQuestions = this.questions.every((question, index) => question.valid);
    this.onValid.emit({valid: validQuestions});
  }
}
