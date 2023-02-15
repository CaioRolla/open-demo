import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyContainerComponent } from './lazy-container.component';

@NgModule({
  declarations: [LazyContainerComponent],
  exports: [LazyContainerComponent],
  imports: [CommonModule],
})
export class LazyContainerModule {}
