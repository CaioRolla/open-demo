import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap, delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { LoginFacade } from './login.facade';
import * as LoginActions from './login.actions';
import { AuthService } from '../../../services/auth.service';
import { Snackbar } from '@demo/shared-app/ui/snackbar';
import { AuthFacade } from '../../../+state/auth-app.facade';

declare let $localize: any;

@Injectable()
export class LoginEffects {
  public readonly login$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(LoginActions.login),
      switchMap((action) => {
        return this._authService.login(action.dto).pipe(
          map((res) => {
            return LoginActions.loginSuccess({ res });
          }),
          catchError((error) => {
            return of(LoginActions.loginFailure({ error, email: action.dto.email }));
          })
        );
      })
    );
  });

  public readonly loginFailure$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(LoginActions.loginFailure),
        tap((action) => {
          if(action.error.message.includes('Email not confirmed')){
            this._router.navigate(['/', 'auth', 'confirm-email', action.email])
          } else {
            const message = $localize`Incorrect email and/or password.`;
            const icon = 'x';
            this._snackbar.open({ message, icon });
          }
        })
      );
    },
    { dispatch: false }
  );

  public readonly loginSuccess$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(LoginActions.loginSuccess),
        tap((action) => {
          this._authAppFacade.setToken(action.res.accessToken);
        }),
        tap(() => this._router.navigate(['/'])),
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
