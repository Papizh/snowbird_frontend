import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuestionAnswer } from '../../models/document-answer.interface';
import { UserAnswer } from '../../models/user-answer.interface';

@Component({
  selector: 'app-single-textbox',
  templateUrl: './single-textbox.component.html',
  styleUrls: ['./single-textbox.component.scss']
})
export class SingleTextboxComponent implements OnInit {
  
  @Input() answers: UserAnswer[];
  @Input() questions: QuestionAnswer[];
  @Input() previewMode: boolean = false;
  @Output() onPush = new EventEmitter();
  @Output() onRemove = new EventEmitter();
  @Output() onValid = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onFocus(index: number, array: Array<any>) {
    if (index === (array.length - 1)) {
      this.onPush.emit();
    }
  }

  trackValid({valid}) {
    this.questions[0].valid = valid;
    this.onValid.emit({valid});
  }
}
