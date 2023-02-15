import { createReducer, on, Action } from '@ngrx/store';
import { ErrorResponseDto } from '@demo/shared/utils';

import * as DeleteListActions from './delete-list.actions';

export const FEATURE_KEY = 'deleteList';

export interface DeleteListState {
  deleting: boolean;
  error?: ErrorResponseDto | null;
}

export const initialState: DeleteListState = {
  deleting: false
};

const featureReducer = createReducer(
  initialState,
  on(DeleteListActions.deleteList, (state, action) => ({
    ...state,
    deleting: true,
  })),
  on(DeleteListActions.deleteListSuccess, (state, action) => ({
    ...state,
    deleting: false,
  })),
  on(DeleteListActions.deleteListFailure, (state, action) => ({
    ...state,
    deleting: false,
    error: action.error,
  })),
  on(DeleteListActions.resetState, (state, action) => ({
    ...initialState,
  }))
);

export function reducer(state: DeleteListState | undefined, action: Action) {
  return featureReducer(state, action);
}
