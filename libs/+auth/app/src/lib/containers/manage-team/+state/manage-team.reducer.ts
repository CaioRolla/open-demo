import { createReducer, on, Action, ActionReducer } from '@ngrx/store';

import * as ManageTeamActions from './manage-team.actions';
import {
  ErrorResponseDto,
  GetAllQueryDto,
  GetAllResponseDto,
} from '@demo/shared/utils';
import { GetAllInviteDto } from '@demo/+auth/core';

export const FEATURE_KEY = 'manageTeam';

export interface ManageTeamState {
  invitesQuery?: GetAllQueryDto;
  loadInvitesRes?: GetAllResponseDto<GetAllInviteDto>;
  loadingInvites: boolean;
  loadingInvitesSilently: boolean;
  loadInvitesError?: ErrorResponseDto | null;

  creatingInvite: boolean;
  createInviteError?: ErrorResponseDto | null;

  patchingInvite: boolean;
  patchInviteError?: ErrorResponseDto | null;
  patchingInviteId?: string | null;

  resendingInvite: boolean;
  resendInviteError?: ErrorResponseDto | null;
  resendingInviteId?: string | null;
}

export const initialState: ManageTeamState = {
  loadingInvites: false,
  loadingInvitesSilently: false,
  creatingInvite: false,

  patchingInvite: false,

  resendingInvite: false
};

const featureReducer = createReducer(
  initialState,
  on(ManageTeamActions.resendInvite, (state, action) => ({
    ...state,
    resendingInvite: true,
    resendingInviteId: action.resendDto.id
  })),
  on(ManageTeamActions.resendInviteSuccess, (state, action) => ({
    ...state,
    resendingInvite: false,
    resendingInviteId: null
  })),
  on(ManageTeamActions.resendInviteFailure, (state, action) => ({
    ...state,
    resendingInvite: false,
    resendInviteError: action.error,
    resendingInviteId: null
  })),
  
  on(ManageTeamActions.patchInvite, (state, action) => ({
    ...state,
    patchingInvite: true,
    patchingInviteId: action.patchDto.id
  })),
  on(ManageTeamActions.patchInviteSuccess, (state, action) => ({
    ...state,
    patchingInvite: false,
    patchingInviteId: null
  })),
  on(ManageTeamActions.patchInviteFailure, (state, action) => ({
    ...state,
    patchingInvite: false,
    patchInviteError: action.error,
    patchingInviteId: null
  })),

  on(ManageTeamActions.createInvite, (state, action) => ({
    ...state,
    creatingInvite: true
  })),
  on(ManageTeamActions.createInviteSuccess, (state, action) => ({
    ...state,
    creatingInvite: false
  })),
  on(ManageTeamActions.createInviteFailure, (state, action) => ({
    ...state,
    creatingInvite: false,
    createInviteError: action.error
  })),
  on(ManageTeamActions.nextInvites, (state, action) => ({
    ...state,
    invitesQuery: state.invitesQuery
      ? {
          ...state.invitesQuery,
          page: (state.invitesQuery.page || 0) + 1,
        }
      : {
          page: 0,
        },
    loadingInvitesSilently: true,
  })),
  on(ManageTeamActions.previousInvites, (state, action) => ({
    ...state,
    invitesQuery: state.invitesQuery
      ? {
          ...state.invitesQuery,
          page: (state.invitesQuery.page || 0) - 1,
        }
      : {
          page: 0,
        },
    loadingInvitesSilently: true,
  })),
  on(ManageTeamActions.loadInvites, (state, action) => ({
    ...state,
    loadingInvites: true,
    invitesQuery: action.query,
  })),
  on(ManageTeamActions.loadInvitesSuccess, (state, action) => ({
    ...state,
    loadingInvites: false,
    loadInvitesRes: action.res,
    loadInvitesError: null,
    loadingInvitesSilently: false,
  })),
  on(ManageTeamActions.loadInvitesFailure, (state, action) => ({
    ...state,
    loadingInvites: false,
    loadInvitesError: action.error,
    loadingInvitesSilently: false,
  }))
);

export function reducer(state: ManageTeamState | undefined, action: Action) {
  return featureReducer(state, action);
}
