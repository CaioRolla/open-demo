import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ForgotPasswordState, FEATURE_KEY } from './forgot-password.reducer';

export const selectState = createFeatureSelector<ForgotPasswordState>(FEATURE_KEY);

export const selectLoading = createSelector(
  selectState,
  (state) => state.loading
);

export const selectError = createSelector(selectState, (state) => state.error);
