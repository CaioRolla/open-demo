import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { CardModule } from '../card';
import { ButtonModule } from '../button';

@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [CommonModule, CardModule, ButtonModule],
  providers: [],
  exports: [
    ConfirmationDialogComponent
  ]
})
export class ConfirmationDialogModule {}
