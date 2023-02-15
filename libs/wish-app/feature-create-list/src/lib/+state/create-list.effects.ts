import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { Snackbar } from '@demo/shared-app/ui/snackbar';
import { Router } from '@angular/router';
import * as CreateListActions from './create-list.actions';
import { ListService } from '@demo/wish-app/application/services';
import { Dialog } from '@demo/shared-app/ui/dialog';

declare let $localize: any;

@Injectable()
export class CreateListEffects {
  public readonly createList$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(CreateListActions.createList),
      switchMap((action) => {
        return this._listService.create(action.createDto).pipe(
          map((res) => {
            return CreateListActions.createListSuccess({ res });
          }),
          catchError((error) => {
            return of(CreateListActions.createListFailure({ error }));
          })
        );
      })
    );
  });

  public readonly createListSuccess$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(CreateListActions.createListSuccess),
        tap((action) => {
          this._router.navigate(['/list', action.res.id]);
        }),
        tap(() => this._dialog.close())
      );
    },
    { dispatch: false }
  );

  public readonly createListFailure$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(CreateListActions.createListFailure),
        tap((action) => {
          const message = $localize`Failed to create list.`;
          const icon = 'x';
          this._snackbar.open({ message, icon });
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _listService: ListService,
    private readonly _router: Router,
    private readonly _dialog: Dialog,
    private readonly _snackbar: Snackbar
  ) {}
}
