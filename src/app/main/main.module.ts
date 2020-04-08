import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import {MainComponent} from './main.component';
import {SharedModule} from '../shared/shared.module';
import {MatSidenavModule} from '@angular/material';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatSidenavModule,
    SharedModule
  ]
})
export class MainModule { }
