import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroIconsModule } from 'ng-heroicons';

import { PaginatorComponent } from './paginator.component';
import { ButtonModule } from '../button';

@NgModule({
  declarations: [
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    HeroIconsModule
  ],
  exports: [
    PaginatorComponent
  ]
})
export class PaginatorModule { }
