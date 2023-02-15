import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PushModule } from '@rx-angular/template/push';

import { AuthButtonModule } from '@demo/shared-app/ui/auth-button';
import { ButtonModule } from '@demo/shared-app/ui/button';
import { CardModule } from '@demo/shared-app/ui/card';
import { DividedPageWrapperModule } from '@demo/shared-app/ui/divided-page-wrapper';
import { ConfirmEmailComponent } from './confirm-email.component';
import { UnauthenticatedGuard } from '../../guards/unauthenticated.guard';
import { FormFieldModule } from '@demo/shared-app/forms/form-field';
import * as fromConfirmEmail from './+state/confirm-email.reducer';
import { ConfirmEmailEffects } from './+state/confirm-email.effects';
import { ConfirmEmailFacade } from './+state/confirm-email.facade';
import { SnackbarModule } from '@demo/shared-app/ui/snackbar';

@NgModule({
  declarations: [ConfirmEmailComponent],
  imports: [
    CommonModule,
    AuthButtonModule,
    DividedPageWrapperModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    FormFieldModule,
    RouterModule.forChild([
      {
        path: ':email',
        component: ConfirmEmailComponent,
        canActivate: [UnauthenticatedGuard],
      },
    ]),
    StoreModule.forFeature(fromConfirmEmail.FEATURE_KEY, fromConfirmEmail.reducer, {}),
    EffectsModule.forFeature([ConfirmEmailEffects]),
    SnackbarModule,
    PushModule
  ],
  exports: [ConfirmEmailComponent],
  providers: [ConfirmEmailFacade],
})
export class ConfirmEmailModule {}
