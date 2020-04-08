import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import {SharedModule} from '../shared/shared.module';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule, MatCardModule} from '@angular/material';
import {UsersService} from '../services/users.service';
import {AssignModalComponent} from '../shared/modals/assign-modal/assign-modal.component';
import {DocumentsService} from '../services/documents.service';
import {CreateOrganizationModalComponent} from '../shared/modals/create-organization-modal/create-organization-modal.component';
import {CreateUserModalComponent} from '../shared/modals/create-user-modal/create-user-modal.component';
import {AssignedComponent} from '../shared/modals/assigned/assigned.component';
import { DocumentsModule } from '../documents/documents.module';
import { UsersModule } from '../users/users.module';
import {OrganizationComponent} from '../organizations/components/organization.component';
import {OrganizationsModule} from '../organizations/organizations.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    OrganizationsModule,
    SharedModule,
    DocumentsModule,
    UsersModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [
    UsersService,
    DocumentsService
  ],
  entryComponents: [
    AssignModalComponent,
    CreateOrganizationModalComponent,
    CreateUserModalComponent,
    AssignedComponent
  ]
})
export class HomeModule {
}
