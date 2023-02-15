import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormFieldComponent } from './form-field.component';
import { LabelComponent } from './label/label.component';
import { InputComponent } from './input/input.component';
import { DemoSuffix } from './suffix/suffix.directive';
import { DemoPrefix } from './prefix/prefix.directive';
import { HintComponent } from './hint/hint.component';
import { ErrorComponent } from './error/error.component';
import { SelectComponent } from './select/select.component';
import { WarningComponent } from './warning/warning.component';

@NgModule({
  declarations: [
    FormFieldComponent,
    LabelComponent,
    InputComponent,
    DemoSuffix,
    DemoPrefix,
    HintComponent,
    ErrorComponent,
    SelectComponent,
    WarningComponent
  ],
  imports: [CommonModule],
  exports: [
    FormFieldComponent,
    LabelComponent,
    InputComponent,
    DemoSuffix,
    DemoPrefix,
    HintComponent,
    ErrorComponent,
    SelectComponent,
    WarningComponent
  ],
})
export class FormFieldModule {}
