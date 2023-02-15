import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError, tap, filter } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { Snackbar } from '@demo/shared-app/ui/snackbar';
import { ManageListFacade } from './manage-list.facade';
import * as ManageListActions from './manage-list.actions';
import {
  ListService,
  ProductService,
} from '@demo/wish-app/application/services';

declare let $localize: any;

@Injectable()
export class ManageListEffects {
  public readonly loadList$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ManageListActions.loadList),
      switchMap((action) => {
        return this._listService.get(action.listId).pipe(
          map((res) => {
            return ManageListActions.loadListSuccess({ res });
          }),
          catchError((error) => {
            return of(ManageListActions.loadListFailure({ error }));
          })
        );
      })
    );
  });

  public readonly loadProducts$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ManageListActions.loadProducts),
      switchMap((action) => {
        return this._productService
          .getAll({ listId: action.listId, take: -1 })
          .pipe(
            map((res) => {
              return ManageListActions.loadProductsSuccess({ res });
            }),
            catchError((error) => {
              return of(ManageListActions.loadProductsFailure({ error }));
            })
          );
      })
    );
  });

  public readonly patchList$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ManageListActions.patchList),
      switchMap((action) => {
        return this._listService.patch(action.patchDto).pipe(
          map((res) => {
            return ManageListActions.patchListSuccess({
              res,
              showSuccess: action.showSuccess,
            });
          }),
          catchError((error) => {
            return of(ManageListActions.patchListFailure({ error }));
          })
        );
      })
    );
  });

  public readonly patchListSuccess$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(ManageListActions.patchListSuccess),
        filter((action) => action.showSuccess),
        tap((action) => {
          const message = $localize`List updated successfully!`;
          const icon = 'check';
          this._snackbar.open({ message, icon });
        })
      );
    },
    { dispatch: false }
  );

  public readonly patchListFailure$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(ManageListActions.patchListFailure),
        tap((action) => {
          const message = $localize`Failed to update list.`;
          const icon = 'x';
          this._snackbar.open({ message, icon });
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _manageListFacade: ManageListFacade,
    private readonly _listService: ListService,
    private readonly _productService: ProductService,
    private readonly _snackbar: Snackbar
  ) {}
}
