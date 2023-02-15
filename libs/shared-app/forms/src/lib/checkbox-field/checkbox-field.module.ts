import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxFieldComponent } from './checkbox-field.component';
import { CheckboxFieldInputDirective } from './checkbox-field-input.directive';



@NgModule({
  declarations: [
    CheckboxFieldComponent,
    CheckboxFieldInputDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CheckboxFieldComponent,
    CheckboxFieldInputDirective
  ]
})
export class CheckboxFieldModule { }
