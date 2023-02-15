import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CtaCardComponent } from './cta-card.component';
import { CardModule } from '@demo/shared-app/ui/card';

@NgModule({
  declarations: [
    CtaCardComponent
  ],
  imports: [
    CommonModule,
    CardModule
  ],
  exports: [
    CtaCardComponent
  ]
})
export class CtaCardModule { }
