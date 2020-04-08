import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {NotFoundComponent} from './not-found/not-found.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpConfigInterceptor} from './services/httpconfig.interceptor';
import {ToastrModule} from 'ngx-toastr';
import { SpinnerService } from './shared/services/spinner.service';
import { IsAdminGuard } from './guards/is-admin.guard';
import { IsAdminOrModeratorGuard } from './guards/is-admin-or-moderator.guard';
import { IsModeratorGuard } from './guards/is-moderator.guard';
import { IsSimpleUserGuard } from './guards/is-simple-user.guard';

const components = [
  AppComponent,
  NotFoundComponent
];

const guards = [
  IsAdminGuard,
  IsAdminOrModeratorGuard,
  IsModeratorGuard,
  IsSimpleUserGuard
];

@NgModule({
  declarations: components,
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    SpinnerService,
    ... guards
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
