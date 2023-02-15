import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ResetPasswordState, FEATURE_KEY } from './reset-password.reducer';

export const selectState = createFeatureSelector<ResetPasswordState>(FEATURE_KEY);

export const selectLoading = createSelector(
  selectState,
  (state) => state.loading
);

export const selectError = createSelector(selectState, (state) => state.error);
