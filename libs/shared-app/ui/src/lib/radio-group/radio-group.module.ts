import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RadioGroupButtonComponent } from './radio-group-button/radio-group-button.component';
import { RadioGroupComponent } from './radio-group.component';


@NgModule({
  declarations: [
    RadioGroupButtonComponent,
    RadioGroupComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RadioGroupButtonComponent,
    RadioGroupComponent
  ]
})
export class RadioGroupModule { }
