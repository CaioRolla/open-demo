import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressModule } from '../progress';
import { LoadingContentComponent } from './loading-content.component';
import { ContentOverContentModule } from '../content-over-content/content-over-content.module';

@NgModule({
  declarations: [LoadingContentComponent],
  imports: [
    CommonModule,
    ProgressModule,
    ContentOverContentModule
  ],
  exports: [LoadingContentComponent]
})
export class LoadingContentModule { }
