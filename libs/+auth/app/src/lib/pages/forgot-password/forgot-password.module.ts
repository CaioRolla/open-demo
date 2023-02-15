import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormFieldModule } from '@demo/shared-app/forms/form-field';
import { PushModule } from '@rx-angular/template/push';

import { AuthButtonModule } from '@demo/shared-app/ui/auth-button';
import { ButtonModule } from '@demo/shared-app/ui/button';
import { CardModule } from '@demo/shared-app/ui/card';
import { DividedPageWrapperModule } from '@demo/shared-app/ui/divided-page-wrapper';
import { ForgotPasswordComponent } from './forgot-password.component';
import { UnauthenticatedGuard } from '../../guards/unauthenticated.guard';
import * as fromForgotPassword from './+state/forgot-password.reducer';
import { ForgotPasswordEffects } from './+state/forgot-password.effects';
import { ForgotPasswordFacade } from './+state/forgot-password.facade';
import { SnackbarModule } from '@demo/shared-app/ui/snackbar';

@NgModule({
  declarations: [ForgotPasswordComponent],
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
        path: '',
        component: ForgotPasswordComponent,
        canActivate: [UnauthenticatedGuard],
      },
    ]),
    StoreModule.forFeature(fromForgotPassword.FEATURE_KEY, fromForgotPassword.reducer, {}),
    EffectsModule.forFeature([ForgotPasswordEffects]),
    SnackbarModule,
    PushModule
  ],
  providers: [ForgotPasswordFacade]
})
export class ForgotPasswordModule {}
