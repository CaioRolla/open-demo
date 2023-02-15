import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividedPageWrapperComponent } from './divided-page-wrapper.component';
import { SharedAppUtilsModule } from '@demo/shared-app/utils';

@NgModule({
  declarations: [DividedPageWrapperComponent],
  imports: [CommonModule, SharedAppUtilsModule],
  exports: [DividedPageWrapperComponent],
})
export class DividedPageWrapperModule {}
