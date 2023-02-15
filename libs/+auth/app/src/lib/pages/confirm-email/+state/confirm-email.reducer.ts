import { createReducer, on, Action, ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import merge from 'lodash.merge';

import * as ConfirmEmailActions from './confirm-email.actions';
import { ErrorResponseDto } from '@demo/shared/utils';

export const FEATURE_KEY = 'resendConfirmation';

export interface ConfirmEmailState {
  loading: boolean;
  error?: ErrorResponseDto | null;
}

export const initialState: ConfirmEmailState = {
  loading: false
};

const featureReducer = createReducer(
  initialState,
  on(ConfirmEmailActions.resendConfirmation, (state, action) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ConfirmEmailActions.resendConfirmationFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error
  })),
  on(ConfirmEmailActions.resendConfirmationSuccess, (state, action) => ({
    ...state,
    loading: false,
  })),
);

export function reducer(state: ConfirmEmailState | undefined, action: Action) {
  return featureReducer(state, action);
}



