import { createAction, props } from '@ngrx/store';

import { CreateListDto, List } from '@demo/wish-shared/core';
import { ErrorResponseDto } from '@demo/shared/utils';

export enum CreateListAction {
  RESET_STATE = '[wish-app-feature-create-list] Reset state',

  CREATE_SURVEY = '[wish-app-feature-create-list] Create List',
  CREATE_SURVEY_SUCCESS = '[wish-app-feature-create-list] Created List successfully',
  CREATE_SURVEY_FAILURE = '[wish-app-feature-create-list] Failed to create List',
}

export const resetState = createAction(CreateListAction.RESET_STATE);

export const createList = createAction(
  CreateListAction.CREATE_SURVEY,
  props<{ createDto: CreateListDto }>()
);

export const createListSuccess = createAction(
  CreateListAction.CREATE_SURVEY_SUCCESS,
  props<{ res: List }>()
);

export const createListFailure = createAction(
  CreateListAction.CREATE_SURVEY_FAILURE,
  props<{ error: ErrorResponseDto }>()
);
