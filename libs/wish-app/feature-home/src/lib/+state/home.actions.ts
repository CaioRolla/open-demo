import { createAction, props } from '@ngrx/store';
import {
  ErrorResponseDto,
  GetAllQueryDto,
  GetAllResponseDto,
} from '@demo/shared/utils';
import { GetAllListDto } from '@demo/wish-shared/core';

export enum HomeAction {
  RESET_STATE = '[wish-app-feature-home] Reset state',

  LOAD_INVITES = '[wish-app-feature-home] Load executions',
  LOAD_INVITES_SUCCESS = '[wish-app-feature-home] Loaded executions',
  LOAD_INVITES_FAILURE = '[wish-app-feature-home] Failed to load executions',
  NEXT_INVITES = '[wish-app-feature-home] Next schedules table ',
  PREVIOUS_INVITES = '[wish-app-feature-home] Previous schedules table page',
}

export const loadLists = createAction(
  HomeAction.LOAD_INVITES,
  props<{ query: GetAllQueryDto }>()
);

export const loadListsSuccess = createAction(
  HomeAction.LOAD_INVITES_SUCCESS,
  props<{ res: GetAllResponseDto<GetAllListDto> }>()
);

export const loadListsFailure = createAction(
  HomeAction.LOAD_INVITES_FAILURE,
  props<{ error: ErrorResponseDto }>()
);

export const nextLists = createAction(HomeAction.NEXT_INVITES);

export const previousLists = createAction(HomeAction.PREVIOUS_INVITES);

export const resetState = createAction(HomeAction.RESET_STATE);
