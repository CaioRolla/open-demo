import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroIconsModule } from 'ng-heroicons';

import { BrowserFrameComponent } from './browser-frame.component';

@NgModule({
  declarations: [
    BrowserFrameComponent
  ],
  imports: [
    CommonModule,
    HeroIconsModule
  ],
  exports: [
    BrowserFrameComponent
  ]
})
export class BrowserFrameModule { }
