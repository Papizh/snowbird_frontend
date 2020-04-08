import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { QuestionType } from '../../models/question-type.interface';
import { QuestionAnswer } from '../../models/document-answer.interface';
import { UserAnswer } from '../../models/user-answer.interface';
import { DocumentQuestion } from '../../models/document-question.interface';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit, OnChanges {

  @Input() type: QuestionType;
  @Input() last: boolean;
  @Input() question: DocumentQuestion;
  @Input() answers: UserAnswer[];
  @Input() resultMode: boolean = false;
  @Output() next = new EventEmitter();

  questions: QuestionAnswer[];
  previewMode = true;
  QuestionType = QuestionType;
  monthFormatMode = false;

  constructor() { }

  ngOnInit() {
    if (this.type === QuestionType.DATE_TIME) {
      this.monthFormatMode = this.questions[0].dateFormat === 'MM_DD_YYYY';
    }
  }

  ngOnChanges(changes) {
    if ( changes && changes.question) {
      this.questions = this.question.answers;
    }
  }

  removeAnswer() {}
  pushNewAnswer() {}

  toggleValid({valid}) {
    setTimeout( () => this.question.answered = valid, 0);
  }
}
