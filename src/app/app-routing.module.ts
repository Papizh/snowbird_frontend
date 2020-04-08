import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './core/auth/login/login.component';
import {RegisterComponent} from './core/auth/register/register.component';
import {NotFoundComponent} from './not-found/not-found.component';
import { IsAdminOrModeratorGuard } from './guards/is-admin-or-moderator.guard';


const routes: Routes = [
  {
    path: 'main',
    loadChildren: './main/main.module#MainModule'
  },
  {
    path: 'new-document',
    canActivate: [IsAdminOrModeratorGuard],
    loadChildren: './new-document/new-document.module#NewDocumentModule'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'documents',
    canActivate: [IsAdminOrModeratorGuard],
    loadChildren: './documents/documents.module#DocumentsModule'
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
