import { createReducer, on, Action, ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import merge from 'lodash.merge';

import * as AuthAppActions from './auth-app.actions';

export const FEATURE_KEY = 'auth-app';

export interface AuthAppState {
  token: string | null;
}

export const initialState: AuthAppState = {
  token: null
};

const featureReducer = createReducer(
  initialState,
  on(AuthAppActions.setToken, (state, action) => ({
    ...state,
    token: action.token,
  })),
  on(AuthAppActions.logout, (state, action) => ({
    ...state,
    token: null,
  }))
);

export function reducer(state: AuthAppState | undefined, action: Action) {
  return featureReducer(state, action);
}



