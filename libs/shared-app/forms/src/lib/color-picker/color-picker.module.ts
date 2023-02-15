import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerComponent } from './color-picker.component';
import { ColorPickerModule as ColorPickerModuleLib } from 'ngx-color-picker';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ColorPickerComponent],
  imports: [CommonModule, ColorPickerModuleLib, ReactiveFormsModule],
  exports: [ColorPickerComponent],
})
export class ColorPickerModule {}
