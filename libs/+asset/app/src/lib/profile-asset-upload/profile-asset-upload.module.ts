import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeroIconsModule } from 'ng-heroicons';

import { ProfileAssetUploadComponent } from './profile-asset-upload.component';
import { ProgressModule } from '@demo/shared-app/ui/progress';
import { ButtonModule } from '@demo/shared-app/ui/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DataProgressFormatterPipe } from './pipes/data-progress-formatter.pipe';
import { DataProgressThemePipe } from './pipes/data-progress-theme.pipe';

@NgModule({
  imports: [
    CommonModule,
    HeroIconsModule,
    ProgressModule,
    ButtonModule,
    DragDropModule,
  ],
  declarations: [
    ProfileAssetUploadComponent,
    DataProgressFormatterPipe,
    DataProgressThemePipe
  ],
  exports: [ProfileAssetUploadComponent],
})
export class ProfileAssetUploadModule {}
