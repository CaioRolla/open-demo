import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap, delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { ForgotPasswordFacade } from './forgot-password.facade';
import * as ForgotPasswordActions from './forgot-password.actions';
import { AuthService } from '../../../services/auth.service';
import { Snackbar } from '@demo/shared-app/ui/snackbar';
import { AuthFacade } from '../../../+state/auth-app.facade';

declare let $localize: any;

@Injectable()
export class ForgotPasswordEffects {
  public readonly resendConfirmation$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ForgotPasswordActions.resendConfirmation),
      switchMap((action) => {
        return this._authService.forgotPassword(action.dto).pipe(
          map((res) => {
            return ForgotPasswordActions.resendConfirmationSuccess({ email: action.dto.email });
          }),
          catchError((error) => {
            return of(ForgotPasswordActions.resendConfirmationFailure({ error }));
          })
        );
      })
    );
  });

  public readonly resendConfirmationFailure$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(ForgotPasswordActions.resendConfirmationFailure),
        tap(() => {
          const message = $localize`Failed to resend the confirmation. Contact the system administrator.`;
          const icon = 'x';
          this._snackbar.open({ message, icon });
        })
      );
    },
    { dispatch: false }
  );

  public readonly resendConfirmationSuccess$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(ForgotPasswordActions.resendConfirmationSuccess),
        tap((action) => {
          this._router.navigate(['/', 'auth', 'forgot-password-email', action.email]);
        }),
        // delay(200),
        // tap((action) => {
        //   const message = $localize`A new confirmation email was sent to you.`;
        //   const icon = 'check';
        //   this._snackbar.open({ message, icon });
        // })
      );
    },
    { dispatch: false }
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _router: Router,
    private readonly _authService: AuthService,
    private readonly _authAppFacade: AuthFacade,
    private readonly _snackbar: Snackbar
  ) {}
}
