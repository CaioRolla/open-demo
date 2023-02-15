import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import { PublicListState } from './public-list.reducer';
import * as PublicListSelectors from './public-list.selectors';
import * as PublicListActions from './public-list.actions';

@Injectable()
export class PublicListFacade {
  public readonly actions$ = this._actions$.pipe(map((a) => a.type));

  public readonly list$ = this._store.select(PublicListSelectors.selectList);

  public readonly loadingList$ = this._store.select(
    PublicListSelectors.selectList
  );

  public readonly loadListError$ = this._store.select(
    PublicListSelectors.selectLoadListError
  );

  public readonly personName$ = this._store.select(
    PublicListSelectors.selectPersonName
  );

  public readonly personEmail$ = this._store.select(
    PublicListSelectors.selectPersonEmail
  );

  public readonly selectingProduct$ = this._store.select(
    PublicListSelectors.selectSelectingProduct
  );

  public readonly selectingProductId$ = this._store.select(
    PublicListSelectors.selectSelectingProductId
  );

  public readonly selectProductError$ = this._store.select(
    PublicListSelectors.selectSelectProductError
  );

  constructor(
    private readonly _store: Store<PublicListState>,
    private readonly _actions$: Actions
  ) {}

  public unselectProduct(productId: string): void {
    this._store.dispatch(PublicListActions.unselectProduct({ productId }));
  }

  public selectProduct(productId: string): void {
    this._store.dispatch(PublicListActions.selectProduct({ productId }));
  }

  public setPerson(name: string, email: string): void {
    this._store.dispatch(PublicListActions.setPerson({ name, email }));
  }

  public loadList(listSlug: string): void {
    this._store.dispatch(PublicListActions.loadList({ listSlug }));
  }

  public resetState(): void {
    this._store.dispatch(PublicListActions.resetState());
  }
}
