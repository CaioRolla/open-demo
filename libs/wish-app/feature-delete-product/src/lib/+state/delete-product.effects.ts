import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { Snackbar } from '@demo/shared-app/ui/snackbar';
import { DeleteProductFacade } from './delete-product.facade';
import * as DeleteProductActions from './delete-product.actions';
import { ProductService } from '@demo/wish-app/application/services';
import { Dialog } from '@demo/shared-app/ui/dialog';

declare let $localize: any;

@Injectable()
export class DeleteProductEffects {
  public readonly deleteProduct$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(DeleteProductActions.deleteProduct),
      switchMap((action) => {
        return this._productService.delete(action.productId).pipe(
          map((res) => {
            return DeleteProductActions.deleteProductSuccess();
          }),
          catchError((error) => {
            return of(DeleteProductActions.deleteProductFailure({ error }));
          })
        );
      })
    );
  });

  public readonly deleteProductSuccess$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(DeleteProductActions.deleteProductSuccess),
        tap(() => this._dialog.close(true)),
        tap((action) => {
          const message = $localize`Product deleted successfully!`;
          const icon = 'check';
          this._snackbar.open({ message, icon });
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _deleteProductFacade: DeleteProductFacade,
    private readonly _productService: ProductService,
    private readonly _snackbar: Snackbar,
    private readonly _dialog: Dialog
  ) {}
}
