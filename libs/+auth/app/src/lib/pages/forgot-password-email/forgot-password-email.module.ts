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
import { UnauthenticatedGuard } from '../../guards/unauthenticated.guard';
import { FormFieldModule } from '@demo/shared-app/forms/form-field';
import { ForgotPasswordEmailComponent } from './forgot-password-email.component';
import * as fromForgotPasswordEmail from './+state/forgot-password-email.reducer';
import { ForgotPasswordEmailEffects } from './+state/forgot-password-email.effects';
import { ForgotPasswordEmailFacade } from './+state/forgot-password-email.facade';
import { SnackbarModule } from '@demo/shared-app/ui/snackbar';

@NgModule({
  declarations: [ForgotPasswordEmailComponent],
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
        component: ForgotPasswordEmailComponent,
        canActivate: [UnauthenticatedGuard],
      },
    ]),
    StoreModule.forFeature(fromForgotPasswordEmail.FEATURE_KEY, fromForgotPasswordEmail.reducer, {}),
    EffectsModule.forFeature([ForgotPasswordEmailEffects]),
    SnackbarModule,
    PushModule
  ],
  providers: [ForgotPasswordEmailFacade]
})
export class ForgotPasswordEmailModule {}
