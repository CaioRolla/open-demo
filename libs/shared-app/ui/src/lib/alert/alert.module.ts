import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroIconsModule } from 'ng-heroicons';

import { AlertComponent } from './alert.component';
import { CardModule } from '../card';

@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    CommonModule,
    HeroIconsModule,
    CardModule
  ],
  exports: [
    AlertComponent
  ]
})
export class AlertModule { }
