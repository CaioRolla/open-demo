import { createReducer, on, Action, ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import merge from 'lodash.merge';

import * as LoginActions from './login.actions';
import { ErrorResponseDto } from '@demo/shared/utils';

export const FEATURE_KEY = 'login';

export interface LoginState {
  loading: boolean;
  error?: ErrorResponseDto | null;
}

export const initialState: LoginState = {
  loading: false
};

const featureReducer = createReducer(
  initialState,
  on(LoginActions.login, (state, action) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(LoginActions.loginFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error
  })),
  on(LoginActions.loginSuccess, (state, action) => ({
    ...state,
    loading: false,
  })),
);

export function reducer(state: LoginState | undefined, action: Action) {
  return featureReducer(state, action);
}



