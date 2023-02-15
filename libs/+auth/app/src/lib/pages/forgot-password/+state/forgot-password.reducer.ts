import { createReducer, on, Action } from '@ngrx/store';

import * as ForgotPasswordActions from './forgot-password.actions';
import { ErrorResponseDto } from '@demo/shared/utils';

export const FEATURE_KEY = 'forgotPassword';

export interface ForgotPasswordState {
  loading: boolean;
  error?: ErrorResponseDto | null;
}

export const initialState: ForgotPasswordState = {
  loading: false
};

const featureReducer = createReducer(
  initialState,
  on(ForgotPasswordActions.resendConfirmation, (state, action) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ForgotPasswordActions.resendConfirmationFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error
  })),
  on(ForgotPasswordActions.resendConfirmationSuccess, (state, action) => ({
    ...state,
    loading: false,
  })),
);

export function reducer(state: ForgotPasswordState | undefined, action: Action) {
  return featureReducer(state, action);
}



