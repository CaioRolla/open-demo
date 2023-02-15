import { createReducer, on, Action, ActionReducer } from '@ngrx/store';

import * as ManageUsersActions from './manage-users.actions';
import {
  ErrorResponseDto,
  GetAllQueryDto,
  GetAllResponseDto,
} from '@demo/shared/utils';
import { GetAllUserDto } from '@demo/+auth/core';

export const FEATURE_KEY = 'manageUsers';

export interface ManageUsersState {
  usersQuery?: GetAllQueryDto;
  loadUsersRes?: GetAllResponseDto<GetAllUserDto>;
  loadingUsers: boolean;
  loadingUsersSilently: boolean;
  loadUsersError?: ErrorResponseDto | null;

  patchingUser: boolean;
  patchUserError?: ErrorResponseDto | null;
  patchingUserId?: string | null;
}

export const initialState: ManageUsersState = {
  loadingUsers: false,
  loadingUsersSilently: false,

  patchingUser: false,
};

const featureReducer = createReducer(
  initialState,
  on(ManageUsersActions.nextUsers, (state, action) => ({
    ...state,
    usersQuery: state.usersQuery
      ? {
          ...state.usersQuery,
          page: (state.usersQuery.page || 0) + 1,
        }
      : {
          page: 0,
        },
    loadingUsersSilently: true,
  })),
  on(ManageUsersActions.previousUsers, (state, action) => ({
    ...state,
    usersQuery: state.usersQuery
      ? {
          ...state.usersQuery,
          page: (state.usersQuery.page || 0) - 1,
        }
      : {
          page: 0,
        },
    loadingUsersSilently: true,
  })),
  on(ManageUsersActions.loadUsers, (state, action) => ({
    ...state,
    loadingUsers: true,
    usersQuery: action.query,
  })),
  on(ManageUsersActions.loadUsersSuccess, (state, action) => ({
    ...state,
    loadingUsers: false,
    loadUsersRes: action.res,
    loadUsersError: null,
    loadingUsersSilently: false,
  })),
  on(ManageUsersActions.loadUsersFailure, (state, action) => ({
    ...state,
    loadingUsers: false,
    loadUsersError: action.error,
    loadingUsersSilently: false,
  })),

  on(ManageUsersActions.patchUser, (state, action) => ({
    ...state,
    patchingUser: true,
    patchingUserId: action.patchDto.id
  })),
  on(ManageUsersActions.patchUserSuccess, (state, action) => ({
    ...state,
    patchingUser: false,
    patchingUserId: null
  })),
  on(ManageUsersActions.patchUserFailure, (state, action) => ({
    ...state,
    patchingUser: false,
    patchUserError: action.error,
    patchingUserId: null
  })),
);

export function reducer(state: ManageUsersState | undefined, action: Action) {
  return featureReducer(state, action);
}
