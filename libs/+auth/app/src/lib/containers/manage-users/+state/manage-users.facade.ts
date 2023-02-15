import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import * as ManageUsersSelectors from './manage-users.selectors';
import { ManageUsersState } from './manage-users.reducer';
import * as ManageUsersActions from './manage-users.actions';
import { GetAllQueryDto } from '@demo/shared/utils';
import { PatchUserDto } from '@demo/+auth/core';

@Injectable()
export class ManageUsersFacade {
  public readonly actions$ = this._actions$.pipe(map((a) => a.type));

  public readonly loadingUsers$ = this._store.select(
    ManageUsersSelectors.selectLoadingUsers
  );

  public readonly loadingUsersSilently$ = this._store.select(
    ManageUsersSelectors.selectLoadingUsersSilently
  );

  public readonly usersRes$ = this._store.select(
    ManageUsersSelectors.selectUsersRes
  );

  public readonly usersResData$ = this._store.select(
    ManageUsersSelectors.selectUsersResData
  );

  public readonly loadUsersError$ = this._store.select(
    ManageUsersSelectors.selectLoadUsersError
  );

  public readonly usersPage$ = this._store.select(
    ManageUsersSelectors.selectUsersPage
  );

  public readonly disableNextUsers$ = this._store.select(
    ManageUsersSelectors.selectDisableNextUsers
  );

  public readonly disablePreviousUsers$ = this._store.select(
    ManageUsersSelectors.selectDisablePreviousUsers
  );

  public readonly paginatedUsersCount$ = this._store.select(
    ManageUsersSelectors.selectPaginatedUsersCount
  );

  public readonly usersResDataCount$ = this._store.select(
    ManageUsersSelectors.selectUsersResDataCount
  );

  public readonly displayEmptyMessage$ = this._store.select(
    ManageUsersSelectors.selectDisplayEmptyMessage
  );

  public readonly usersQuery$ = this._store.select(
    ManageUsersSelectors.selectUsersQuery
  );

  public readonly patchingUserId$ = this._store.select(
    ManageUsersSelectors.selectPatchingUserId
  );

  public readonly patchUserError$ = this._store.select(
    ManageUsersSelectors.selectPatchUserError
  );

  constructor(
    private readonly _store: Store<ManageUsersState>,
    private readonly _actions$: Actions
  ) {}

  public resetState(): void {
    this._store.dispatch(ManageUsersActions.resetState());
  }

  public loadUsers(query: GetAllQueryDto): void {
    this._store.dispatch(ManageUsersActions.loadUsers({ query }));
  }

  public nextUsers(): void {
    this._store.dispatch(ManageUsersActions.nextUsers());
  }

  public previousUsers(): void {
    this._store.dispatch(ManageUsersActions.previousUsers());
  }

  public patchUser(patchDto: PatchUserDto): void {
    this._store.dispatch(ManageUsersActions.patchUser({ patchDto }));
  }
}
