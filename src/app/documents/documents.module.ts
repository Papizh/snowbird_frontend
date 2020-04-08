import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import {SharedModule} from '../shared/shared.module';
import {DocumentsRoutingModule} from './documents-routing.module';
import { DocumentsListComponent } from './components/documents-list/documents-list.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import {
  MatButtonModule, MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatPaginatorModule,
  MatTableModule,
  MatTabsModule,
  MatCardModule
} from '@angular/material';


import {DocumentsService} from '../services/documents.service';
import {DeleteDocModalComponent} from '../shared/modals/delete-doc-modal/delete-doc-modal.component';
import { DocumentResultsComponent } from './components/document-results/document-results.component';
import { QuestionComponent } from './components/question/question.component';
import { NewDocumentModule } from '../new-document/new-document.module';
import { DocumentPassComponent } from './components/document-pass/document-pass.component';
import { OpacityDirective } from './directives/opacity.directive';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    IndexComponent,
    DocumentsListComponent,
    DocumentResultsComponent,
    QuestionComponent,
    DocumentPassComponent,
    OpacityDirective
  ],
  imports: [
    CommonModule,
    SharedModule,
    DocumentsRoutingModule,
    NewDocumentModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatMenuModule,
    MatPaginatorModule,
    MatDialogModule,
    ScrollToModule.forRoot()
  ],
  providers: [
    DocumentsService
  ],
  entryComponents: [
    DeleteDocModalComponent
  ],
  exports: [
    DocumentsListComponent
  ]
})
export class DocumentsModule { }
