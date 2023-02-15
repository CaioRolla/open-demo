import { createReducer, on, Action, ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import merge from 'lodash.merge';

import * as RegisterActions from './register.actions';
import { ErrorResponseDto } from '@demo/shared/utils';

export const FEATURE_KEY = 'register';

export interface RegisterState {
  loading: boolean;
  error?: ErrorResponseDto | null;
}

export const initialState: RegisterState = {
  loading: false
};

const featureReducer = createReducer(
  initialState,
  on(RegisterActions.register, (state, action) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(RegisterActions.registerFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error
  })),
  on(RegisterActions.registerSuccess, (state, action) => ({
    ...state,
    loading: false,
  })),
);

export function reducer(state: RegisterState | undefined, action: Action) {
  return featureReducer(state, action);
}



