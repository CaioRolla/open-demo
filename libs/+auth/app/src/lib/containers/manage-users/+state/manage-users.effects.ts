import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap, delay, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';

import { ManageUsersFacade } from './manage-users.facade';
import * as ManageUsersActions from './manage-users.actions';
import { Snackbar } from '@demo/shared-app/ui/snackbar';
import { AuthFacade } from '../../../+state/auth-app.facade';
import { UserService } from '@demo/+auth/app/services';
import { UserStatus } from '@demo/+auth/core';

declare let $localize: any;

@Injectable()
export class ManageUsersEffects {
  public readonly reloadUsers$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ManageUsersActions.reloadUsers),
      concatLatestFrom(() => this._manageUsersFacade.usersQuery$),
      switchMap(([action, query]) => {
        return this._userService.getAll(query!).pipe(
          map((res) => {
            return ManageUsersActions.loadUsersSuccess({ res });
          }),
          catchError((error) => {
            return of(ManageUsersActions.loadUsersFailure({ error }));
          })
        );
      })
    );
  });

  public readonly loadUsers$ = createEffect(() => {
    return this._manageUsersFacade.usersQuery$.pipe(
      filter((query) => !!query),
      switchMap((query) => {
        return this._userService.getAll(query!).pipe(
          map((res) => {
            return ManageUsersActions.loadUsersSuccess({ res });
          }),
          catchError((error) => {
            return of(ManageUsersActions.loadUsersFailure({ error }));
          })
        );
      })
    );
  });

  public readonly patchUser$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ManageUsersActions.patchUser),
      switchMap((action) => {
        return this._userService.patch(action.patchDto).pipe(
          map((res) => {
            return ManageUsersActions.patchUserSuccess({ res });
          }),
          catchError((error) => {
            return of(ManageUsersActions.patchUserFailure({ error }));
          })
        );
      })
    );
  });

  public readonly patchUserSuccess$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ManageUsersActions.patchUserSuccess),
      tap((action) => {
        const message = $localize`User updated successfully.`;
        const icon = 'check';
        this._snackbar.open({ icon, message });
      }),
      map(() => ManageUsersActions.reloadUsers())
    );
  });

  constructor(
    private readonly _actions$: Actions,
    private readonly _router: Router,
    private readonly _authAppFacade: AuthFacade,
    private readonly _manageUsersFacade: ManageUsersFacade,
    private readonly _userService: UserService,
    private readonly _snackbar: Snackbar
  ) {}
}
