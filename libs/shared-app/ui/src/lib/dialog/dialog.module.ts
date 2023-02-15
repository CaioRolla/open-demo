import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FullscreenOverlayContainer,
  OverlayContainer,
  OverlayModule,
} from '@angular/cdk/overlay';

import { Dialog } from './dialog.service';

@NgModule({
  declarations: [

  ],
  imports: [CommonModule, OverlayModule],
  providers: [
    Dialog,
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
  ],
  exports: [
    
  ],
})
export class DialogModule {}
