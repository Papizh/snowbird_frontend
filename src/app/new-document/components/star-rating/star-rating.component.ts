import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuestionAnswer } from '../../models/document-answer.interface';
import { UserAnswer } from '../../models/user-answer.interface';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {
  
  @Input() previewMode: boolean = false;
  @Input() answers: UserAnswer[];
  @Input() questions: QuestionAnswer[];
  @Output() onPush = new EventEmitter();
  @Output() onRemove = new EventEmitter();
  @Output() onValid = new EventEmitter();

  rating = 0;

  shapes = ['star', 'heart', 'thumb', 'smile'];
  constructor() { }

  ngOnInit() {
    if (this.answers && this.answers.length) {
      this.answers.forEach((answer, index) => {
        if (!!answer.id) {
          this.rating = index;
        }
      });
      this.rating = this.rating ? this.rating : -1;
    }
    this.trackValid();
  }

  onFocus(index: number, array: Array<any>) {
    if (index === (array.length - 1) && array.length < 5) {
      this.onPush.emit();
    }
  }

  onClick(index) {
    if (this.previewMode) {
      this.rating = index;
      this.answers[index].rating = -1;
      this.answers.forEach((answer, i) => {
        if (i !== index) {
          answer.rating = 0;
        }
      });
      this.trackValid();
    }
  }

  changeSelection() {
    this.questions.forEach((item) => item.startPoint = this.questions[0].startPoint);
  }

  trackValid() {
    const valid = this.answers.some(answer => answer.rating === -1);
    this.onValid.emit({valid});
  }
}
