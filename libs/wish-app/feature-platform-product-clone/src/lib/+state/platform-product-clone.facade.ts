import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import { PlatformProductCloneState } from './platform-product-clone.reducer';
import * as PlatformProductCloneSelectors from './platform-product-clone.selectors';
import * as PlatformProductCloneActions from './platform-product-clone.actions';

@Injectable()
export class PlatformProductCloneFacade {
  public readonly actions$ = this._actions$.pipe(map((a) => a.type));

  public readonly loadingProducts$ = this._store.select(
    PlatformProductCloneSelectors.selectLoadingProducts
  );

  public readonly loadProductsError$ = this._store.select(
    PlatformProductCloneSelectors.selectLoadProductsError
  );

  public readonly productsRes$ = this._store.select(
    PlatformProductCloneSelectors.selectProductsRes
  );

  public readonly productsSearchQuery$ = this._store.select(
    PlatformProductCloneSelectors.selectProductsSearchQuery
  );

  public readonly filteredProducts$ = this._store.select(
    PlatformProductCloneSelectors.selectFilteredProducts
  );

  public readonly displayEmptyMessage$ = this._store.select(
    PlatformProductCloneSelectors.selectDisplayEmptyMessage
  );

  public readonly filteredProductsCount$ = this._store.select(
    PlatformProductCloneSelectors.selectFilteredProductsCount
  );

  public readonly cloningProducts$ = this._store.select(
    PlatformProductCloneSelectors.selectCloningProducts
  );

  public readonly listId$ = this._store.select(
    PlatformProductCloneSelectors.selectListId
  );

  constructor(
    private readonly _store: Store<PlatformProductCloneState>,
    private readonly _actions$: Actions
  ) {}

  public setProductsSearchQuery(query: string | null): void {
    this._store.dispatch(
      PlatformProductCloneActions.setProductsSearchQuery({ query })
    );
  }

  public loadPlatformProducts(listId: string): void {
    this._store.dispatch(
      PlatformProductCloneActions.loadPlatformProducts({ listId })
    );
  }

  public cloneProducts(productIds: string[]): void {
    this._store.dispatch(
      PlatformProductCloneActions.cloneProducts({ productIds })
    );
  }

  

  public resetState(): void {
    this._store.dispatch(PlatformProductCloneActions.resetState());
  }
}
