import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuestionAnswer} from '../../models/document-answer.interface';
import {UserAnswer} from '../../models/user-answer.interface';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  @Input() answers: UserAnswer[];
  @Input() questions: QuestionAnswer[];
  @Input() previewMode: boolean = false;
  @Output() onPush = new EventEmitter();
  @Output() onRemove = new EventEmitter();
  @Output() onValid = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    if (this.questions && this.questions[0]) {
      if (!this.questions[0].startPoint) {
        this.questions[0].startPoint = 0;
      }
      if (!this.questions[0].endPoint) {
        this.questions[0].endPoint = 10;
      }
      if (!this.questions[0].placeOrder) {
        this.questions[0].placeOrder = 1;
      }
    }
    setTimeout(() => this.onValid.emit({valid: true}));
  }

  onFocus(index: number, array: Array<any>) {
    if (index === (array.length - 1)) {
      this.onPush.emit();
    }
  }
}
