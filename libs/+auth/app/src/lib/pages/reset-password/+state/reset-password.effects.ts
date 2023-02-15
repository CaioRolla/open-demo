import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { ResetPasswordFacade } from './reset-password.facade';
import * as ResetPasswordActions from './reset-password.actions';
import { AuthService } from '../../../services/auth.service';
import { Snackbar } from '@demo/shared-app/ui/snackbar';
import { AuthFacade } from '../../../+state/auth-app.facade';

declare let $localize: any;

@Injectable()
export class ResetPasswordEffects {
  public readonly reset$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ResetPasswordActions.reset),
      switchMap((action) => {
        return this._authService.resetPassword(action.dto).pipe(
          map((res) => {
            return ResetPasswordActions.resetSuccess({ res });
          }),
          catchError((error) => {
            return of(ResetPasswordActions.resetFailure({ error }));
          })
        );
      })
    );
  });

  public readonly resetFailure$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(ResetPasswordActions.resetFailure),
        tap(() => {
          const message = $localize`Something went wrong. Check your email for instructions on how to reset your password.`;
          const icon = 'x';
          this._snackbar.open({ message, icon });
        })
      );
    },
    { dispatch: false }
  );

  public readonly resetSuccess$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(ResetPasswordActions.resetSuccess),
        tap((action) => {
          this._authAppFacade.setToken(action.res.accessToken);
        }),
        tap(() => this._router.navigate(['/']))
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
