import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewDocumentRoutingModule } from './new-document-routing.module';
import { IndexComponent } from './index/index.component';
import { 
  MatInputModule, 
  MatFormFieldModule, 
  MatCardModule, 
  MatRadioModule, 
  MatSliderModule, 
  MatDatepickerModule, 
  MatNativeDateModule, 
  MatSelectModule, 
  MatSlideToggleModule,
  MatCheckboxModule,
  MatButtonModule} from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { QuestionBodyComponent } from './components/question-body/question-body.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultipleTextboxesComponent } from './components/multiple-textboxes/multiple-textboxes.component';
import { MultipleChoiceComponent } from './components/multiple-choice/multiple-choice.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { SharedModule } from '../shared/shared.module';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { SingleTextboxComponent } from './components/single-textbox/single-textbox.component';
import { CommentBoxComponent } from './components/comment-box/comment-box.component';
import { SliderComponent } from './components/slider/slider.component';
import { DateTimeComponent } from './components/date-time/date-time.component';
import { DocumentComponent } from './components/document/document.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { AnswerValidationComponent } from './components/answer-validation/answer-validation.component';

@NgModule({
  declarations: [
    IndexComponent,
    QuestionBodyComponent,
    MultipleTextboxesComponent,
    MultipleChoiceComponent,
    StarRatingComponent,
    RankingComponent,
    DropdownComponent,
    SingleTextboxComponent,
    CommentBoxComponent,
    SliderComponent,
    DateTimeComponent,
    DocumentComponent,
    FileUploadComponent,
    AnswerValidationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NewDocumentRoutingModule,
    MatFormFieldModule,
    MatRadioModule,
    MatInputModule,
    MatSliderModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatButtonModule,
    DragDropModule,
    AngularFileUploaderModule
  ],
  exports: [
    QuestionBodyComponent,
    DocumentComponent
  ]
})
export class NewDocumentModule { }
