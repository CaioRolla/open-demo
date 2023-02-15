import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';

// import { Snackbar } from '@demo/shared-app/ui/snackbar';
import { PlatformProductCloneFacade } from './platform-product-clone.facade';
import * as PlatformProductCloneActions from './platform-product-clone.actions';
import {
  PlatformProductService,
  ProductService,
} from '@demo/wish-app/application/services';
import { Dialog } from '@demo/shared-app/ui/dialog';
import { Snackbar } from '@demo/shared-app/ui/snackbar';

declare let $localize: any;

@Injectable()
export class PlatformProductCloneEffects {
  public readonly loadPlatformProducts$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(PlatformProductCloneActions.loadPlatformProducts),
      switchMap((action) => {
        return this._platformProductService.getAll({ take: -1 }).pipe(
          map((res) => {
            return PlatformProductCloneActions.loadPlatformProductsSuccess({
              res,
            });
          }),
          catchError((error) => {
            return of(
              PlatformProductCloneActions.loadPlatformProductsFailure({ error })
            );
          })
        );
      })
    );
  });

  public readonly cloneProducts$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(PlatformProductCloneActions.cloneProducts),
      concatLatestFrom(() => this._platformProductCloneFacade.listId$),
      switchMap(([action, listId]) => {
        return this._productService
          .clonePlatformProduct({
            platformProductIds: action.productIds,
            listId: listId as string,
          })
          .pipe(
            map((res) => {
              return PlatformProductCloneActions.cloneProductsSuccess({ res });
            }),
            catchError((error) => {
              return of(
                PlatformProductCloneActions.cloneProductsFailure({ error })
              );
            })
          );
      })
    );
  });

  public readonly cloneProductsSuccess$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(PlatformProductCloneActions.cloneProductsSuccess),
        tap(() => this._dialog.close(true)),
        tap((action) => {
          const message = $localize`Products added to list!`;
          const icon = 'check';
          this._snackbar.open({ message, icon });
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _platformProductCloneFacade: PlatformProductCloneFacade,
    private readonly _platformProductService: PlatformProductService,
    private readonly _productService: ProductService,
    private readonly _dialog: Dialog,
    private readonly _snackbar: Snackbar,
  ) {}
}
