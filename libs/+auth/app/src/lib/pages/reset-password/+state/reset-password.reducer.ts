import { createReducer, on, Action, ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import merge from 'lodash.merge';

import * as ResetPasswordActions from './reset-password.actions';
import { ErrorResponseDto } from '@demo/shared/utils';

export const FEATURE_KEY = 'resetPassword';

export interface ResetPasswordState {
  loading: boolean;
  error?: ErrorResponseDto | null;
}

export const initialState: ResetPasswordState = {
  loading: false
};

const featureReducer = createReducer(
  initialState,
  on(ResetPasswordActions.reset, (state, action) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ResetPasswordActions.resetFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error
  })),
  on(ResetPasswordActions.resetSuccess, (state, action) => ({
    ...state,
    loading: false,
  })),
);

export function reducer(state: ResetPasswordState | undefined, action: Action) {
  return featureReducer(state, action);
}



