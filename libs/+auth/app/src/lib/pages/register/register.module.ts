import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PushModule } from '@rx-angular/template/push';

import { SnackbarModule } from '@demo/shared-app/ui/snackbar';
import { AuthButtonModule } from '@demo/shared-app/ui/auth-button';
import { ButtonModule } from '@demo/shared-app/ui/button';
import { CardModule } from '@demo/shared-app/ui/card';
import { DividedPageWrapperModule } from '@demo/shared-app/ui/divided-page-wrapper';
import { RegisterComponent } from './register.component';
import { UnauthenticatedGuard } from '../../guards/unauthenticated.guard';
import { FormFieldModule } from '@demo/shared-app/forms/form-field';
import * as fromRegister from './+state/register.reducer';
import { RegisterEffects } from './+state/register.effects';
import { RegisterFacade } from './+state/register.facade';

@NgModule({
  declarations: [RegisterComponent],
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
        component: RegisterComponent,
        canActivate: [UnauthenticatedGuard],
      },
    ]),
    StoreModule.forFeature(fromRegister.FEATURE_KEY, fromRegister.reducer, {}),
    EffectsModule.forFeature([RegisterEffects]),
    SnackbarModule,
    PushModule
  ],
  providers: [RegisterFacade],
  exports: [RegisterComponent],
})
export class RegisterModule {}
