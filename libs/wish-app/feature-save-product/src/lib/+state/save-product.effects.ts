import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { Snackbar } from '@demo/shared-app/ui/snackbar';
import { SaveProductFacade } from './save-product.facade';
import * as SaveProductActions from './save-product.actions';
import { ProductDataService, ProductService } from '@demo/wish-app/application/services';
import { Dialog } from '@demo/shared-app/ui/dialog';

declare let $localize: any;

@Injectable()
export class SaveProductEffects {
  public readonly loadProduct$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(SaveProductActions.loadProduct),
      switchMap((action) => {
        return this._productService.get(action.productId).pipe(
          map((res) => {
            return SaveProductActions.loadProductSuccess({ res });
          }),
          catchError((error) => {
            return of(SaveProductActions.loadProductFailure({ error }));
          })
        );
      })
    );
  });

  public readonly saveProduct$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(SaveProductActions.saveProduct),
      switchMap((action) => {
        const method = action.saveDto.id
          ? this._productService.patch(action.saveDto)
          : this._productService.create(action.saveDto);

        return method.pipe(
          map((res) => {
            return SaveProductActions.saveProductSuccess({ res });
          }),
          catchError((error) => {
            return of(SaveProductActions.saveProductFailure({ error }));
          })
        );
      })
    );
  });

  public readonly saveProductSuccess$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(SaveProductActions.saveProductSuccess),
        tap(() => this._dialog.close(true)),
        tap((action) => {
          const message = $localize`Product saved successfully!`;
          const icon = 'check';
          this._snackbar.open({ message, icon });
        })
      );
    },
    { dispatch: false }
  );

  public readonly loadProductData$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(SaveProductActions.loadProductData),
      switchMap((action) => {
        return this._productDataService.get(action.url).pipe(
          map((res) => {
            return SaveProductActions.loadProductDataSuccess({ res });
          }),
          catchError((error) => {
            return of(SaveProductActions.loadProductDataFailure({ error }));
          })
        );
      })
    );
  });

  constructor(
    private readonly _dialog: Dialog,
    private readonly _actions$: Actions,
    private readonly _saveProductFacade: SaveProductFacade,
    private readonly _productService: ProductService,
    private readonly _snackbar: Snackbar,
    private readonly _productDataService: ProductDataService
  ) {}
}
