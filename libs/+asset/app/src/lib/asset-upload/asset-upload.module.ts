import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeroIconsModule } from 'ng-heroicons';

import { AssetUploadComponent } from './asset-upload.component';
import { ProgressModule } from '@demo/shared-app/ui/progress';
import { DataProgressFormatterPipe } from './pipes/data-progress-formatter.pipe';
import { DataProgressThemePipe } from './pipes/data-progress-theme.pipe';
import { ButtonModule } from '@demo/shared-app/ui/button';
import { DataIsImagePipe } from './pipes/data-is-image.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    CommonModule,
    HeroIconsModule,
    ProgressModule,
    ButtonModule,
    DragDropModule,
  ],
  declarations: [
    AssetUploadComponent,
    DataProgressFormatterPipe,
    DataProgressThemePipe,
    DataIsImagePipe,
  ],
  exports: [AssetUploadComponent],
})
export class AssetUploadModule {}
