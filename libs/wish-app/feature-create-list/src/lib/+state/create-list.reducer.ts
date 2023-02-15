import { createReducer, on, Action } from '@ngrx/store';

import * as CreateListActions from './create-list.actions';

export const FEATURE_KEY = 'createList';

export interface CreateListState {
  creatingList: boolean;
}

export const initialState: CreateListState = {
  creatingList: false,
};

const featureReducer = createReducer(
  initialState,
  on(CreateListActions.createList, (state, action) => ({
    ...state,
    creatingList: true,
  })),
  on(CreateListActions.createListSuccess, (state, action) => ({
    ...state,
    creatingList: false,
  })),
  on(CreateListActions.createListFailure, (state, action) => ({
    ...state,
    creatingList: false,
  })),
  on(CreateListActions.resetState, (state, action) => ({
    ...initialState,
  }))
);

export function reducer(state: CreateListState | undefined, action: Action) {
  return featureReducer(state, action);
}
