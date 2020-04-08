import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuestionAnswer} from '../../models/document-answer.interface';
import { QuestionType } from '../../models/question-type.interface';
import { UserAnswer } from '../../models/user-answer.interface';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss']
})
export class DateTimeComponent implements OnInit {

  @Input() answers: UserAnswer[];
  @Input() questions: QuestionAnswer[];
  @Input() previewMode: boolean = false;
  @Output() onValid = new EventEmitter();

  public monthFormatMode: any;

  constructor() {
  }

  ngOnInit() {
    this.monthFormatMode = this.questions[0].dateFormat === 'MM_DD_YYYY';
  }
  getPattern() {
    this.questions[0].dateFormat = this.monthFormatMode ? 'MM_DD_YYYY' : 'DD_MM_YYYY';
  }

  trackValid() {
    let valid = false;
    valid = !!this.answers[0].text;
    this.onValid.emit({valid});
  }
}
