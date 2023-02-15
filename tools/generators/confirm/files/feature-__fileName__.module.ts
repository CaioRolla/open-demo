import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { <%= className %>Facade } from './+state/<%= fileName %>.facade';
import { <%= className %>Component } from './<%= fileName %>/<%= fileName %>.component';
import { SnackbarModule } from '@demo/shared-app/ui/snackbar';
import { ConfirmationDialogModule } from '@demo/shared-app/ui/confirmation-dialog';

@NgModule({
  imports: [
    CommonModule,
    SnackbarModule,
    ConfirmationDialogModule
  ],
  providers: [
    <%= className %>Facade
  ],
  declarations: [
    <%= className %>Component
  ],
  entryComponents: [
    <%= className %>Component
  ]
})
export class Feature<%= className %>Module {}
