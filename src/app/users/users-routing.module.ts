import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexComponent} from './index/index.component';
import {UserPageComponent} from './components/user-page/user-page.component';
import { UserPageDocumentComponent } from './components/user-page-document/user-page-document.component';
import { IsAdminOrModeratorGuard } from '../guards/is-admin-or-moderator.guard';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    canActivate: [IsAdminOrModeratorGuard],
    component: IndexComponent
  },
  { path: ':id', component: UserPageComponent },
  { path: ':id/assignments', component: UserPageDocumentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
