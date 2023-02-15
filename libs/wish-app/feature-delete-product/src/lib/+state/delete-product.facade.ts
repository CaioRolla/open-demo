import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import { DeleteProductState } from './delete-product.reducer';
import * as DeleteProductSelectors from './delete-product.selectors';
import * as DeleteProductActions from './delete-product.actions';

@Injectable()
export class DeleteProductFacade {
  public readonly actions$ = this._actions$.pipe(map((a) => a.type));

  public readonly deleting$ = this._store.select(
    DeleteProductSelectors.selectDeleting
  );

  public readonly error$ = this._store.select(
    DeleteProductSelectors.selectError
  );

  constructor(
    private readonly _store: Store<DeleteProductState>,
    private readonly _actions$: Actions
  ) {}

  public resetState(): void {
    this._store.dispatch(DeleteProductActions.resetState());
  }

  public deleteProduct(productId: string): void {
    this._store.dispatch(DeleteProductActions.deleteProduct({ productId }));
  }
}
