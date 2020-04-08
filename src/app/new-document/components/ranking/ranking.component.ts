import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { QuestionAnswer } from '../../models/document-answer.interface';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { UserAnswer } from '../../models/user-answer.interface';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit, OnChanges {

  @Input() previewMode: boolean = false;
  @Input() answers: UserAnswer[];
  @Input() questions: QuestionAnswer[];
  @Input() type: 'radio' | 'checkbox';
  @Output() onPush = new EventEmitter();
  @Output() onRemove = new EventEmitter();
  @Output() onValid = new EventEmitter();

  constructor() { }

  ngOnInit() {
    setTimeout( () => this.onValid.emit({valid: true}));
    this.setRating();
  }

  ngOnChanges() {
    if (this.answers && this.answers[0].id) {
      this.questions = this.setRightOrder();
    }
  }

  setRightOrder(): QuestionAnswer[] {
    const ratings: UserAnswer[] = [];
    const questions: QuestionAnswer[] = [];

    this.answers.forEach( (answer) => {
      if ((!!answer.id || answer.id === 0)) {
        ratings.push(answer);
      }
    });
    ratings.sort((a, b) => (a.rating > b.rating) ? 1 : ((b.rating > a.rating) ? -1 : 0));
    ratings.forEach( (rank) => {
      questions.push(this.questions.find((question) => question.id === rank.answerId));
    });
    return questions;
  }

  onFocus(index: number, array: Array<any>) {
    if (index === (array.length - 1)) {
      this.onPush.emit();
    }
  }

  dropRank(event: CdkDragDrop<any>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
    moveItemInArray(this.answers, event.previousIndex, event.currentIndex);
    this.setRating();
  }

  setRating() {
    this.answers.forEach((answer, index) => answer.rating = index + 1);
  }
}
