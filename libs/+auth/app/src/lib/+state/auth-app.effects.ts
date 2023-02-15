import { Injectable } from '@angular/core';
import { tap, delay, switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { AuthFacade } from './auth-app.facade';
import * as AuthAppActions from './auth-app.actions';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthAppEffects {
  public readonly logout$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(AuthAppActions.logout),
        delay(100),
        tap((action) => {
          localStorage.removeItem('_adminAccountIdAccess');
          this._router.navigate(['/', 'auth', 'sign-in']);
        })
      );
    },
    { dispatch: false }
  );

  public readonly openStripePortal$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(AuthAppActions.openStripePortal),
      switchMap((action) => {
        return this._authService.getStripeCustomerPortalURL().pipe(
          map((res) => {
            return AuthAppActions.openStripePortalSuccess({ url: res.url });
          }),
          catchError((error) => {
            return of(AuthAppActions.openStripePortalFailure({ error }));
          })
        );
      })
    );
  });

  public readonly openStripePortalSuccess$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(AuthAppActions.openStripePortalSuccess),
        tap((action) => {
          window.location.href = action.url;
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _router: Router,
    private readonly _authService: AuthService
  ) {}
}
