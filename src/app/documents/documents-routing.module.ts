import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexComponent} from './index/index.component';
import { DocumentResultsComponent } from './components/document-results/document-results.component';
import { DocumentPassComponent } from './components/document-pass/document-pass.component';
import { IsAdminOrModeratorGuard } from '../guards/is-admin-or-moderator.guard';
import { IsSimpleUserGuard } from '../guards/is-simple-user.guard';

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {
    path: 'list',
    canActivate: [IsAdminOrModeratorGuard],
    component: IndexComponent
  },
  {
    path: ':id/results',
    component: DocumentResultsComponent
  },
  {
    path: ':id/pass',
    canActivate: [IsSimpleUserGuard],
    component: DocumentPassComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule { }
