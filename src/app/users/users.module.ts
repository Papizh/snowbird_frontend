import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import {SharedModule} from '../shared/shared.module';
import {UsersRoutingModule} from './users-routing.module';
import { OrganizationsUsersListComponent } from './components/organizations-users-list/organizations-users-list.component';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule} from '@angular/material';
import {UsersService} from '../services/users.service';
import {OrganizationsService} from '../services/organizations.service';
import { UserPageComponent } from './components/user-page/user-page.component';
import { UserPageDocumentComponent } from './components/user-page-document/user-page-document.component';
import {DocumentsService} from '../services/documents.service';
import {AssignModalComponent} from '../shared/modals/assign-modal/assign-modal.component';
import {AssignedComponent} from '../shared/modals/assigned/assigned.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import {CreateUserModalComponent} from '../shared/modals/create-user-modal/create-user-modal.component';
import {DeleteDocModalComponent} from '../shared/modals/delete-doc-modal/delete-doc-modal.component';

@NgModule({
  declarations: [
    IndexComponent,
    OrganizationsUsersListComponent,
    UserPageComponent,
    UserPageDocumentComponent,
    UserItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule
  ],
  providers: [
    UsersService,
    OrganizationsService,
    DocumentsService
  ],
  entryComponents: [
    AssignModalComponent,
    AssignedComponent,
    CreateUserModalComponent,
    DeleteDocModalComponent
  ],
  exports: [
    UserItemComponent
  ]
})
export class UsersModule { }
