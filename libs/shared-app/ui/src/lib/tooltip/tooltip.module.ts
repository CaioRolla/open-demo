import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { TooltipComponent } from './tooltip/tooltip.component';
import { TooltipDirective } from './tooltip.directive';

@NgModule({
  declarations: [
    TooltipComponent,
    TooltipDirective
  ],
  imports: [
    CommonModule,
    OverlayModule
  ],
  exports: [
    TooltipComponent,
    TooltipDirective
  ]
})
export class TooltipModule { }
