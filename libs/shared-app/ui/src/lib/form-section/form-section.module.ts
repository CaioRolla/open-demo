import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormSectionHeaderComponent } from './form-section-header/form-section-header.component';
import { FormSectionSeparatorComponent } from './form-section-separator/form-section-separator.component';



@NgModule({
  declarations: [
    FormSectionHeaderComponent,
    FormSectionSeparatorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormSectionHeaderComponent,
    FormSectionSeparatorComponent
  ]
})
export class FormSectionModule { }
