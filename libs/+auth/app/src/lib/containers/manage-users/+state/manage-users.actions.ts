import { createAction, props } from '@ngrx/store';
import { GetAllUserDto, PatchUserDto, User } from '@demo/+auth/core';
import {
  ErrorResponseDto,
  GetAllQueryDto,
  GetAllResponseDto,
} from '@demo/shared/utils';

export enum ManageUsersAction {
  RELOAD_USERS = '[auth-manage-users] Reload executions',

  LOAD_USERS = '[auth-manage-users] Load executions',
  LOAD_USERS_SUCCESS = '[auth-manage-users] Loaded executions',
  LOAD_USERS_FAILURE = '[auth-manage-users] Failed to load executions',
  NEXT_USERS = '[auth-manage-users] Next schedules table ',
  PREVIOUS_USERS = '[auth-manage-users] Previous schedules table page',
  RESET_STATE = '[auth-manage-users] Reset state',

  PATCH_USER = '[auth-manage-team] Patch user ',
  PATCH_USER_SUCCESS = '[auth-manage-team] patch user successfully',
  PATCH_USER_FAILURE = '[auth-manage-team] Failed to patch user',
}

export const reloadUsers = createAction(ManageUsersAction.RELOAD_USERS);

export const loadUsers = createAction(
  ManageUsersAction.LOAD_USERS,
  props<{ query: GetAllQueryDto }>()
);

export const loadUsersSuccess = createAction(
  ManageUsersAction.LOAD_USERS_SUCCESS,
  props<{ res: GetAllResponseDto<GetAllUserDto> }>()
);

export const loadUsersFailure = createAction(
  ManageUsersAction.LOAD_USERS_FAILURE,
  props<{ error: ErrorResponseDto }>()
);

export const nextUsers = createAction(ManageUsersAction.NEXT_USERS);

export const previousUsers = createAction(ManageUsersAction.PREVIOUS_USERS);

export const resetState = createAction(ManageUsersAction.RESET_STATE);

export const patchUser = createAction(
  ManageUsersAction.PATCH_USER,
  props<{ patchDto: PatchUserDto }>()
);

export const patchUserSuccess = createAction(
  ManageUsersAction.PATCH_USER_SUCCESS,
  props<{ res: User }>()
);

export const patchUserFailure = createAction(
  ManageUsersAction.PATCH_USER_FAILURE,
  props<{ error: ErrorResponseDto }>()
);
