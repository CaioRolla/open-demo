import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import { ManageListState } from './manage-list.reducer';
import * as ManageListSelectors from './manage-list.selectors';
import * as ManageListActions from './manage-list.actions';
import { List, PatchListDto } from '@demo/wish-shared/core';

@Injectable()
export class ManageListFacade {
  public readonly actions$ = this._actions$.pipe(map((a) => a.type));

  public readonly list$ = this._store.select(ManageListSelectors.selectList);

  public readonly loadingList$ = this._store.select(
    ManageListSelectors.selectList
  );

  public readonly loadListError$ = this._store.select(
    ManageListSelectors.selectLoadListError
  );

  public readonly productsRes$ = this._store.select(
    ManageListSelectors.selectProductsRes
  );

  public readonly products$ = this._store.select(
    ManageListSelectors.selectProducts
  );

  public readonly loadProductsError$ = this._store.select(
    ManageListSelectors.selectLoadProductsError
  );

  public readonly loadingProducts$ = this._store.select(
    ManageListSelectors.selectLoadingProducts
  );

  public readonly displayEmptyMessage$ = this._store.select(
    ManageListSelectors.selectDisplayEmptyMessage
  );

  public readonly patchingList$ = this._store.select(
    ManageListSelectors.selectPatchingList
  );

  public readonly patchListError$ = this._store.select(
    ManageListSelectors.selectPatchListError
  );

  public readonly previewList$ = this._store.select(
    ManageListSelectors.selectPreviewList
  );

  public readonly previewProducts$ = this._store.select(
    ManageListSelectors.selectPreviewProducts
  );

  public readonly productsSearchQuery$ = this._store.select(
    ManageListSelectors.selectProductsSearchQuery
  );

  public readonly filteredProducts$ = this._store.select(
    ManageListSelectors.selectFilteredProducts
  );

  public readonly filteredProductsCount$ = this._store.select(
    ManageListSelectors.selectFilteredProductsCount
  ); 

  constructor(
    private readonly _store: Store<ManageListState>,
    private readonly _actions$: Actions
  ) {}

  public resetState(): void {
    this._store.dispatch(ManageListActions.resetState());
  }

  public resetPreview(): void {
    this._store.dispatch(ManageListActions.resetPreview());
  }

  public loadList(listId: string): void {
    this._store.dispatch(ManageListActions.loadList({ listId }));
  }

  public setProductsSearchQuery(query: string | null): void {
    this._store.dispatch(ManageListActions.setProductsSearchQuery({ query }));
  }

  public loadProducts(listId: string): void {
    this._store.dispatch(ManageListActions.loadProducts({ listId }));
  }

  public patchList(patchDto: PatchListDto, showSuccess = true): void {
    this._store.dispatch(
      ManageListActions.patchList({ patchDto, showSuccess })
    );
  }

  public previewListChanged(list: Partial<List>): void {
    this._store.dispatch(ManageListActions.previewListChanged({ list }));
  }
}
