import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PushModule } from '@rx-angular/template/push';

import { ButtonModule } from '@demo/shared-app/ui/button';
import { CardModule } from '@demo/shared-app/ui/card';
import { DividedPageWrapperModule } from '@demo/shared-app/ui/divided-page-wrapper';
import { ResetPasswordComponent } from './reset-password.component';
import { UnauthenticatedGuard } from '../../guards/unauthenticated.guard';
import { FormFieldModule } from '@demo/shared-app/forms/form-field';
import * as fromResetPassword from './+state/reset-password.reducer';
import { ResetPasswordEffects } from './+state/reset-password.effects';
import { ResetPasswordFacade } from './+state/reset-password.facade';
import { SnackbarModule } from '@demo/shared-app/ui/snackbar';

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    DividedPageWrapperModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    FormFieldModule,
    RouterModule.forChild([
      {
        path: ':confirmationToken',
        component: ResetPasswordComponent,
        canActivate: [UnauthenticatedGuard],
      },
    ]),
    StoreModule.forFeature(fromResetPassword.FEATURE_KEY, fromResetPassword.reducer, {}),
    EffectsModule.forFeature([ResetPasswordEffects]),
    SnackbarModule,
    PushModule
  ],
  exports: [ResetPasswordComponent],
  providers: [ResetPasswordFacade],
})
export class ResetPasswordModule {}
