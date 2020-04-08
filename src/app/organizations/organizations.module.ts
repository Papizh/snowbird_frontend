import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import {SharedModule} from '../shared/shared.module';
import {OrganizationsRoutingModule} from './organizations-routing.module';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatPaginatorModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';
import {CreateOrganizationModalComponent} from '../shared/modals/create-organization-modal/create-organization-modal.component';
import { OrganizationComponent } from './components/organization.component';
import {DeleteDocModalComponent} from '../shared/modals/delete-doc-modal/delete-doc-modal.component';

@NgModule({
  declarations: [
    IndexComponent,
    OrganizationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OrganizationsRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatMenuModule,
    MatPaginatorModule,
    MatDialogModule,
    MatCardModule
  ],
  entryComponents: [CreateOrganizationModalComponent,  DeleteDocModalComponent],
  exports: [
    OrganizationComponent
  ]
})
export class OrganizationsModule { }
