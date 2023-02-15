import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import { SaveProductState } from './save-product.reducer';
import * as SaveProductSelectors from './save-product.selectors';
import * as SaveProductActions from './save-product.actions';
import { CreateProductDto, PatchProductDto } from '@demo/wish-shared/core';

@Injectable()
export class SaveProductFacade {
  public readonly actions$ = this._actions$.pipe(map((a) => a.type));

  public readonly product$ = this._store.select(
    SaveProductSelectors.selectProduct
  );

  public readonly loadingProduct$ = this._store.select(
    SaveProductSelectors.selectLoadingProduct
  );

  public readonly savingProduct$ = this._store.select(
    SaveProductSelectors.selectSavingProduct
  );

  public readonly saveProductError$ = this._store.select(
    SaveProductSelectors.selectSaveProductError
  );

  public readonly loadingProductData$ = this._store.select(
    SaveProductSelectors.selectLoadingProductData
  );

  public readonly productData$ = this._store.select(
    SaveProductSelectors.selectProductData
  );

  public readonly loadProductDataError$ = this._store.select(
    SaveProductSelectors.selectLoadProductDataError
  );

  constructor(
    private readonly _store: Store<SaveProductState>,
    private readonly _actions$: Actions
  ) {}

  public resetState(): void {
    this._store.dispatch(SaveProductActions.resetState());
  }

  public loadProduct(productId: string): void {
    this._store.dispatch(SaveProductActions.loadProduct({ productId }));
  }

  public loadProductData(url: string): void {
    this._store.dispatch(SaveProductActions.loadProductData({ url }));
  }

  public saveProduct(saveDto: CreateProductDto | PatchProductDto): void {
    this._store.dispatch(SaveProductActions.saveProduct({ saveDto }));
  }
}
