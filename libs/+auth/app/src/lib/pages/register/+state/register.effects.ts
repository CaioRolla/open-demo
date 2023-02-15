import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { RegisterFacade } from './register.facade';
import * as RegisterActions from './register.actions';
import { AuthService } from '../../../services/auth.service';
import { Snackbar } from '@demo/shared-app/ui/snackbar';
import { AuthFacade } from '../../../+state/auth-app.facade';
import { HttpStatusCode } from '@angular/common/http';

declare let $localize: any;

@Injectable()
export class RegisterEffects {
  public readonly register$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(RegisterActions.register),
      switchMap((action) => {
        return this._authService.register(action.dto).pipe(
          map((res) => {
            return RegisterActions.registerSuccess({ email: action.dto.email });
          }),
          catchError((error) => {
            return of(RegisterActions.registerFailure({ error }));
          })
        );
      })
    );
  });

  public readonly registerFailure$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(RegisterActions.registerFailure),
        map(action => {
          switch (action.error.status) {
            case HttpStatusCode.Conflict:
              return $localize`You already have an account. Try logging in.`
          
            default:
              return action.error.message[0];
          }
        }),
        tap((message) => {
          const icon = 'x';
          this._snackbar.open({ message, icon });
        })
      );
    },
    { dispatch: false }
  );

  public readonly registerSuccess$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(RegisterActions.registerSuccess),
        tap((action) => {
          this._router.navigate(['/', 'auth', 'confirm-email', action.email]);
        })
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
