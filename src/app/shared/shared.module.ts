import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatSelectModule, MatTableModule, MatAutocompleteModule
} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {RouterModule} from '@angular/router';

import { AsideMenuComponent } from './components/aside-menu/aside-menu.component';
import {AuthService} from '../core/auth/auth-service/auth.service';
import {DeleteDocModalComponent} from './modals/delete-doc-modal/delete-doc-modal.component';
import {CreateComponent} from './components/create/create.component';
import {CircleChartComponent} from './components/circle-chart/circle-chart.component';
import {AssignModalComponent} from './modals/assign-modal/assign-modal.component';
import {ChooseUsersComponent} from './modals/assign-modal/choose-users/choose-users.component';
import {ChooseDocumentsComponent} from './modals/assign-modal/choose-documents/choose-documents.component';
import {ConfirmAssigningComponent} from './modals/assign-modal/confirm-assigning/confirm-assigning.component';
import {EditDeleteButtonsComponent} from './components/edit-delete-buttons/edit-delete-buttons.component';
import {AssignedComponent} from './modals/assigned/assigned.component';
import {CreateOrganizationModalComponent} from './modals/create-organization-modal/create-organization-modal.component';
import {CreateUserModalComponent} from './modals/create-user-modal/create-user-modal.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FilterDeletedPipe } from './pipes/filter-deleted.pipe';
import { HasRoleDirective } from './directives/has-role.directive';
import { AssignNameComponent } from './modals/assign-modal/assign-name/assign-name.component';
import { UserItemComponent } from './modals/assign-modal/user-item/user-item.component';
import { DocumentItemComponent } from './modals/assign-modal/document-item/document-item.component';
import { ScrollDirectiveDirective } from './directives/scroll-directive.directive';
import { NoNegativeValuePipe } from './pipes/no-negative-value.pipe';

const components = [
  AsideMenuComponent,
  DeleteDocModalComponent,
  CreateComponent,
  CircleChartComponent,
  AssignModalComponent,
  ChooseUsersComponent,
  ChooseDocumentsComponent,
  ConfirmAssigningComponent,
  EditDeleteButtonsComponent,
  AssignedComponent,
  CreateOrganizationModalComponent,
  CreateUserModalComponent,
  AssignNameComponent,
  SpinnerComponent,
  FilterDeletedPipe,
];
 const directives = [
   HasRoleDirective,
   ScrollDirectiveDirective,
   NoNegativeValuePipe
 ];

@NgModule({
  declarations: [...components, ...directives, UserItemComponent, DocumentItemComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    // Material
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatAutocompleteModule,
    DragDropModule,
    MatSelectModule
  ],
  exports: [...components, ...directives],
  providers: [
    AuthService,
  ]
})
export class SharedModule { }
