import { Component, OnInit, Input } from '@angular/core';
import { DocumentQuestion } from 'src/app/new-document/models/document-question.interface';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() question: DocumentQuestion;

  constructor() { }

  ngOnInit() {
  }

}
