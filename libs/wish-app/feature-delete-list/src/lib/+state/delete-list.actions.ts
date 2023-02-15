import { createAction, props } from '@ngrx/store';
import { ErrorResponseDto } from '@demo/shared/utils';

export enum DeleteListAction {
  DELETE_LIST = '[wish-app-feature-delete-list] Delete list',
  DELETE_LIST_SUCCESS = '[wish-app-feature-delete-list] Deleted list successfully',
  DELETE_LIST_FAILURE = '[wish-app-feature-delete-list] Failed to delete list',

  RESET_STATE = '[wish-app-feature-delete-list] Reset state',
}

export const resetState = createAction(DeleteListAction.RESET_STATE);

export const deleteList = createAction(
  DeleteListAction.DELETE_LIST,
  props<{ listId: string }>()
);

export const deleteListSuccess = createAction(
  DeleteListAction.DELETE_LIST_SUCCESS
);

export const deleteListFailure = createAction(
  DeleteListAction.DELETE_LIST_FAILURE,
  props<{ error: ErrorResponseDto }>()
);
