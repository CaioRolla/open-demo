import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import { DeleteListState } from './delete-list.reducer';
import * as DeleteListSelectors from './delete-list.selectors';
import * as DeleteListActions from './delete-list.actions';

@Injectable()
export class DeleteListFacade {
  public readonly actions$ = this._actions$.pipe(map((a) => a.type));

  public readonly deleting$ = this._store.select(
    DeleteListSelectors.selectDeleting
  );

  public readonly error$ = this._store.select(
    DeleteListSelectors.selectError
  );

  constructor(
    private readonly _store: Store<DeleteListState>,
    private readonly _actions$: Actions
  ) {}

  public resetState(): void {
    this._store.dispatch(DeleteListActions.resetState());
  }

  public deleteList(listId: string): void {
    this._store.dispatch(DeleteListActions.deleteList({ listId }));
  }
}
