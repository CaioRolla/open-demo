import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import { CreateListState } from './create-list.reducer';
import * as CreateListSelectors from './create-list.selectors';
import * as CreateListActions from './create-list.actions';
import { CreateListDto } from '@demo/wish-shared/core';

@Injectable()
export class CreateListFacade {
  public readonly actions$ = this._actions$.pipe(map((a) => a.type));

  public readonly creatingList$ = this._store.select(
    CreateListSelectors.selectCreatingList
  );

  constructor(
    private readonly _store: Store<CreateListState>,
    private readonly _actions$: Actions
  ) {}

  public resetState(): void {
    this._store.dispatch(CreateListActions.resetState());
  }

  public createList(createDto: CreateListDto): void {
    this._store.dispatch(CreateListActions.createList({ createDto }));
  }
}
