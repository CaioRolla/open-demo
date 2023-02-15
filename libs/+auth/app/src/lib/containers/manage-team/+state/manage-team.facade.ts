import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import * as ManageTeamSelectors from './manage-team.selectors';
import { ManageTeamState } from './manage-team.reducer';
import * as ManageTeamActions from './manage-team.actions';
import { GetAllQueryDto } from '@demo/shared/utils';
import { CreateInviteDto, PatchInviteDto, ResendInviteDto } from '@demo/+auth/core';

@Injectable()
export class ManageTeamFacade {
  public readonly actions$ = this._actions$.pipe(map((a) => a.type));

  public readonly loadingInvites$ = this._store.select(
    ManageTeamSelectors.selectLoadingInvites
  );

  public readonly loadingInvitesSilently$ = this._store.select(
    ManageTeamSelectors.selectLoadingInvitesSilently
  );

  public readonly invitesRes$ = this._store.select(
    ManageTeamSelectors.selectInvitesRes
  );

  public readonly invitesResData$ = this._store.select(
    ManageTeamSelectors.selectInvitesResData
  );

  public readonly loadInvitesError$ = this._store.select(
    ManageTeamSelectors.selectLoadInvitesError
  );

  public readonly invitesPage$ = this._store.select(
    ManageTeamSelectors.selectInvitesPage
  );

  public readonly disableNextInvites$ = this._store.select(
    ManageTeamSelectors.selectDisableNextInvites
  );

  public readonly disablePreviousInvites$ = this._store.select(
    ManageTeamSelectors.selectDisablePreviousInvites
  );

  public readonly paginatedInvitesCount$ = this._store.select(
    ManageTeamSelectors.selectPaginatedInvitesCount
  );

  public readonly invitesResDataCount$ = this._store.select(
    ManageTeamSelectors.selectInvitesResDataCount
  );

  public readonly displayEmptyMessage$ = this._store.select(
    ManageTeamSelectors.selectDisplayEmptyMessage
  );

  public readonly invitesQuery$ = this._store.select(
    ManageTeamSelectors.selectInvitesQuery
  );

  public readonly creatingInvite$ = this._store.select(
    ManageTeamSelectors.selectCreatingInvite
  );

  public readonly createInviteError$ = this._store.select(
    ManageTeamSelectors.selectCreateInviteError
  );

  public readonly patchingInvite$ = this._store.select(
    ManageTeamSelectors.selectPatchingInvite
  );


  public readonly patchingInviteId$ = this._store.select(
    ManageTeamSelectors.selectPatchingInviteId
  );

  public readonly patchInviteError$ = this._store.select(
    ManageTeamSelectors.selectPatchInviteError
  );

  

  public readonly resendingInvite$ = this._store.select(
    ManageTeamSelectors.selectResendingInvite
  );

  public readonly resendingInviteId$ = this._store.select(
    ManageTeamSelectors.selectResendingInviteId
  );

  public readonly resendInviteError$ = this._store.select(
    ManageTeamSelectors.selectResendInviteError
  );

  constructor(
    private readonly _store: Store<ManageTeamState>,
    private readonly _actions$: Actions
  ) {}

  public resetState(): void {
    this._store.dispatch(ManageTeamActions.resetState());
  }

  public createInvite(createDto: CreateInviteDto): void {
    this._store.dispatch(ManageTeamActions.createInvite({ createDto }));
  }

  public patchInvite(patchDto: PatchInviteDto): void {
    this._store.dispatch(ManageTeamActions.patchInvite({ patchDto }));
  }

  public resendInvite(resendDto: ResendInviteDto): void {
    this._store.dispatch(ManageTeamActions.resendInvite({ resendDto }));
  }

  public loadInvites(query: GetAllQueryDto): void {
    this._store.dispatch(ManageTeamActions.loadInvites({ query }));
  }

  public nextInvites(): void {
    this._store.dispatch(ManageTeamActions.nextInvites());
  }

  public previousInvites(): void {
    this._store.dispatch(ManageTeamActions.previousInvites());
  }
}
