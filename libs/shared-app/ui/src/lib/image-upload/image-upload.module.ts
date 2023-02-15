import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroIconsModule } from 'ng-heroicons';

import { ImageUploadComponent } from './image-upload.component';

@NgModule({
  declarations: [
    ImageUploadComponent
  ],
  imports: [
    CommonModule,
    HeroIconsModule
  ],
  exports: [
    ImageUploadComponent
  ]
})
export class ImageUploadModule { }
