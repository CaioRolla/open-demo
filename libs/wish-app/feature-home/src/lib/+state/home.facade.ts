import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import { HomeState } from './home.reducer';
import * as HomeSelectors from './home.selectors';
import * as HomeActions from './home.actions';
import { GetAllQueryDto } from '@demo/shared/utils';

@Injectable()
export class HomeFacade {
  public readonly actions$ = this._actions$.pipe(map((a) => a.type));

  public readonly loadingLists$ = this._store.select(
    HomeSelectors.selectLoadingLists
  );

  public readonly loadingListsSilently$ = this._store.select(
    HomeSelectors.selectLoadingListsSilently
  );

  public readonly listsRes$ = this._store.select(HomeSelectors.selectListsRes);

  public readonly listsResData$ = this._store.select(
    HomeSelectors.selectListsResData
  );

  public readonly loadListsError$ = this._store.select(
    HomeSelectors.selectLoadListsError
  );

  public readonly listsPage$ = this._store.select(
    HomeSelectors.selectListsPage
  );

  public readonly disableNextLists$ = this._store.select(
    HomeSelectors.selectDisableNextLists
  );

  public readonly disablePreviousLists$ = this._store.select(
    HomeSelectors.selectDisablePreviousLists
  );

  public readonly paginatedListsCount$ = this._store.select(
    HomeSelectors.selectPaginatedListsCount
  );

  public readonly listsResDataCount$ = this._store.select(
    HomeSelectors.selectListsResDataCount
  );

  public readonly displayEmptyMessage$ = this._store.select(
    HomeSelectors.selectDisplayEmptyMessage
  );

  public readonly listsQuery$ = this._store.select(
    HomeSelectors.selectListsQuery
  );

  constructor(
    private readonly _store: Store<HomeState>,
    private readonly _actions$: Actions
  ) {}

  public resetState(): void {
    this._store.dispatch(HomeActions.resetState());
  }

  public loadLists(query: GetAllQueryDto): void {
    this._store.dispatch(HomeActions.loadLists({ query }));
  }

  public nextLists(): void {
    this._store.dispatch(HomeActions.nextLists());
  }

  public previousLists(): void {
    this._store.dispatch(HomeActions.previousLists());
  }
}
