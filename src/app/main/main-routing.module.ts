import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './main.component';
import { IsAdminOrModeratorGuard } from '../guards/is-admin-or-moderator.guard';
import { IsAdminGuard } from '../guards/is-admin.guard';

const routes: Routes = [
  {path: '', component: MainComponent, children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {
        path: 'home',
        canActivate: [IsAdminOrModeratorGuard],
        loadChildren: '../home/home.module#HomeModule'
      },
      {
        path: 'documents',
        loadChildren: '../documents/documents.module#DocumentsModule'
      },
      {
        path: 'users',
        loadChildren: '../users/users.module#UsersModule'
      },
      {
        path: 'organizations',
        canActivate: [IsAdminGuard],
        loadChildren: '../organizations/organizations.module#OrganizationsModule'
      }
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
