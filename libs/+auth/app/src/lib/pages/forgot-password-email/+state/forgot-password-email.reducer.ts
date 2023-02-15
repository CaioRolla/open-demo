import { createReducer, on, Action, ActionReducer } from '@ngrx/store';
import * as ForgotPasswordEmailActions from './forgot-password-email.actions';
import { ErrorResponseDto } from '@demo/shared/utils';

export const FEATURE_KEY = 'forgotPasswordEmail';

export interface ForgotPasswordEmailState {
  loading: boolean;
  error?: ErrorResponseDto | null;
}

export const initialState: ForgotPasswordEmailState = {
  loading: false
};

const featureReducer = createReducer(
  initialState,
  on(ForgotPasswordEmailActions.resendConfirmation, (state, action) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ForgotPasswordEmailActions.resendConfirmationFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error
  })),
  on(ForgotPasswordEmailActions.resendConfirmationSuccess, (state, action) => ({
    ...state,
    loading: false,
  })),
);

export function reducer(state: ForgotPasswordEmailState | undefined, action: Action) {
  return featureReducer(state, action);
}



