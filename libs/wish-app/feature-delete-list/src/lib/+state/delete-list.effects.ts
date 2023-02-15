import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { Snackbar } from '@demo/shared-app/ui/snackbar';
import { DeleteListFacade } from './delete-list.facade';
import * as DeleteListActions from './delete-list.actions';
import { ListService } from '@demo/wish-app/application/services';
import { Dialog } from '@demo/shared-app/ui/dialog';

declare let $localize: any;

@Injectable()
export class DeleteListEffects {
  public readonly deleteList$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(DeleteListActions.deleteList),
      switchMap((action) => {
        return this._listService.delete(action.listId).pipe(
          map((res) => {
            return DeleteListActions.deleteListSuccess();
          }),
          catchError((error) => {
            return of(DeleteListActions.deleteListFailure({ error }));
          })
        );
      })
    );
  });

  public readonly deleteListSuccess$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(DeleteListActions.deleteListSuccess),
        tap(() => this._dialog.close(true)),
        tap((action) => {
          const message = $localize`List deleted successfully!`;
          const icon = 'check';
          this._snackbar.open({ message, icon });
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _deleteListFacade: DeleteListFacade,
    private readonly _listService: ListService,
    private readonly _snackbar: Snackbar,
    private readonly _dialog: Dialog
  ) {}
}
