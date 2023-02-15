import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RadioCardGroupComponent } from './radio-card-group/radio-card-group.component';
import { RadioCardItemComponent } from './radio-card-item/radio-card-item.component';
import { RadioCardItemInputDirective } from './radio-card-item-input.directive';



@NgModule({
  declarations: [
    RadioCardGroupComponent,
    RadioCardItemComponent,
    RadioCardItemInputDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    RadioCardGroupComponent,
    RadioCardItemComponent,
    RadioCardItemInputDirective
  ]
})
export class RadioCardModule { }
