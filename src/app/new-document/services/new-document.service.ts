import {Injectable} from '@angular/core';
import {QuestionType} from '../models/question-type.interface';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {DocumentBuilder} from '../models/document-builder.interface';

@Injectable({
  providedIn: 'root'
})
export class NewDocumentService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  create(document: DocumentBuilder) {
    return this.http.post(`${this.apiUrl}api/v1/a/document/create`, document);
  }

  publish(documentId: number) {
    return this.http.put(`${this.apiUrl}api/v1/a/document/publish`, {documentId});
  }

  edit(document: DocumentBuilder) {
    return this.http.put(`${this.apiUrl}api/v1/a/document/edit`, document);
  }

  getStructure(documentId: number) {
    return this.http.get(`${this.apiUrl}api/v1/a/document/get/structure?documentId=${documentId}`);
  }

  getQuestionTypes(): Array<any> {
    const questionTypes = [
      {
        icon: 'one-line',
        type: QuestionType.SINGLE_TEXTBOX,
        text: 'Single textbox'
      },
      {
        icon: 'multilines',
        type: QuestionType.COMMENT_BOX,
        text: 'Comment box'
      },
      {
        icon: 'textboxes',
        type: QuestionType.MULTIPLE_TEXTBOXES,
        text: 'Multiple textboxes'
      },
      {
        icon: 'choices',
        type: QuestionType.MULTIPLE_CHOICE,
        text: 'Multiple choices'
      },
      {
        icon: 'checkbox',
        type: QuestionType.CHECKBOXES,
        text: 'Checkboxes'
      },
      {
        icon: 'slider',
        type: QuestionType.SLIDER,
        text: 'Slider'
      },
      {
        icon: 'datetime',
        type: QuestionType.DATE_TIME,
        text: 'Date picker'
      },
      {
        icon: 'upload',
        type: QuestionType.FILE_UPLOAD,
        text: 'File upload'
      },
      {
        icon: 'dropdown',
        type: QuestionType.DROPDOWN,
        text: 'Dropdown'
      },
      {
        icon: 'stars',
        type: QuestionType.STAR_RATING,
        text: 'Star rating'
      },
      {
        icon: 'ranking',
        type: QuestionType.RANKING,
        text: 'Ranking'
      },
    ];

    return questionTypes;
  }
}
