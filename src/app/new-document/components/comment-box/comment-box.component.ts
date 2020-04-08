import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuestionAnswer} from '../../models/document-answer.interface';
import { UserAnswer } from '../../models/user-answer.interface';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.scss']
})
export class CommentBoxComponent implements OnInit {

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

  trackValid({valid}) {
    this.questions[0].valid = valid;
    this.onValid.emit({valid});
  }
}
