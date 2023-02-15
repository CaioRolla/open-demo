import { createAction, props } from '@ngrx/store';
import {
  CreateInviteDto,
  GetAllInviteDto,
  Invite,
  PatchInviteDto,
  ResendInviteDto,
} from '@demo/+auth/core';
import {
  ErrorResponseDto,
  GetAllQueryDto,
  GetAllResponseDto,
} from '@demo/shared/utils';

export enum ManageTeamAction {
  RELOAD_INVITES = '[auth-manage-team] Reload executions',

  LOAD_INVITES = '[auth-manage-team] Load executions',
  LOAD_INVITES_SUCCESS = '[auth-manage-team] Loaded executions',
  LOAD_INVITES_FAILURE = '[auth-manage-team] Failed to load executions',
  NEXT_INVITES = '[auth-manage-team] Next schedules table ',
  PREVIOUS_INVITES = '[auth-manage-team] Previous schedules table page',
  RESET_STATE = '[auth-manage-team] Reset state',

  CREATE_INVITE = '[auth-manage-team] Create invite ',
  CREATE_INVITE_SUCCESS = '[auth-manage-team] Create invite successfully',
  CREATE_INVITE_FAILURE = '[auth-manage-team] Failed to create invite',

  PATCH_INVITE = '[auth-manage-team] Patch invite ',
  PATCH_INVITE_SUCCESS = '[auth-manage-team] patch invite successfully',
  PATCH_INVITE_FAILURE = '[auth-manage-team] Failed to patch invite',

  RESEND_INVITE = '[auth-manage-team] Resend invite ',
  RESEND_INVITE_SUCCESS = '[auth-manage-team] Resend invite successfully',
  RESEND_INVITE_FAILURE = '[auth-manage-team] Failed to Resend invite',
}

export const resendInvite = createAction(
  ManageTeamAction.RESEND_INVITE,
  props<{ resendDto: ResendInviteDto }>()
);

export const resendInviteSuccess = createAction(
  ManageTeamAction.RESEND_INVITE_SUCCESS,
  props<{ res: Invite }>()
);

export const resendInviteFailure = createAction(
  ManageTeamAction.RESEND_INVITE_FAILURE,
  props<{ error: ErrorResponseDto }>()
);

export const reloadInvites = createAction(ManageTeamAction.RELOAD_INVITES);

export const patchInvite = createAction(
  ManageTeamAction.PATCH_INVITE,
  props<{ patchDto: PatchInviteDto }>()
);

export const patchInviteSuccess = createAction(
  ManageTeamAction.PATCH_INVITE_SUCCESS,
  props<{ res: Invite }>()
);

export const patchInviteFailure = createAction(
  ManageTeamAction.PATCH_INVITE_FAILURE,
  props<{ error: ErrorResponseDto }>()
);

export const createInvite = createAction(
  ManageTeamAction.CREATE_INVITE,
  props<{ createDto: CreateInviteDto }>()
);

export const createInviteSuccess = createAction(
  ManageTeamAction.CREATE_INVITE_SUCCESS,
  props<{ res: Invite }>()
);

export const createInviteFailure = createAction(
  ManageTeamAction.CREATE_INVITE_FAILURE,
  props<{ error: ErrorResponseDto }>()
);

export const loadInvites = createAction(
  ManageTeamAction.LOAD_INVITES,
  props<{ query: GetAllQueryDto }>()
);

export const loadInvitesSuccess = createAction(
  ManageTeamAction.LOAD_INVITES_SUCCESS,
  props<{ res: GetAllResponseDto<GetAllInviteDto> }>()
);

export const loadInvitesFailure = createAction(
  ManageTeamAction.LOAD_INVITES_FAILURE,
  props<{ error: ErrorResponseDto }>()
);

export const nextInvites = createAction(ManageTeamAction.NEXT_INVITES);

export const previousInvites = createAction(
  ManageTeamAction.PREVIOUS_INVITES
);

export const resetState = createAction(ManageTeamAction.RESET_STATE);
