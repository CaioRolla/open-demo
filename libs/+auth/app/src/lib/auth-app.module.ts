import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthConfig } from './auth-app.config';
import * as fromAuthApp from './+state/auth-app.reducer';
import { AuthAppEffects } from './+state/auth-app.effects';
import { AuthFacade } from './+state/auth-app.facade';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAuthApp.FEATURE_KEY, fromAuthApp.reducer, {}),
    EffectsModule.forFeature([AuthAppEffects]),
    RouterModule.forChild([
      {
        path: 'auth',
        children: [
          {
            path: 'sign-in',
            loadChildren: () =>
              import('./pages/login/login.module').then((m) => m.LoginModule),
          },
          {
            path: 'sign-up',
            loadChildren: () =>
              import('./pages/register/register.module').then(
                (m) => m.RegisterModule
              ),
          },
          {
            path: 'confirm-email',
            loadChildren: () =>
              import('./pages/confirm-email/confirm-email.module').then(
                (m) => m.ConfirmEmailModule
              ),
          },
          {
            path: 'forgot-password-email',
            loadChildren: () =>
              import(
                './pages/forgot-password-email/forgot-password-email.module'
              ).then((m) => m.ForgotPasswordEmailModule),
          },
          {
            path: 'forgot-password',
            loadChildren: () =>
              import('./pages/forgot-password/forgot-password.module').then(
                (m) => m.ForgotPasswordModule
              ),
          },
          {
            path: 'reset-password',
            loadChildren: () =>
              import('./pages/reset-password/reset-password.module').then(
                (m) => m.ResetPasswordModule
              ),
          },
          {
            path: '**',
            redirectTo: 'sign-in',
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AuthAppModule {
  static forRoot(config: AuthConfig): ModuleWithProviders<AuthAppModule> {
    return {
      ngModule: AuthAppModule,
      providers: [{ provide: AuthConfig, useValue: config }, AuthFacade],
    };
  }
}
