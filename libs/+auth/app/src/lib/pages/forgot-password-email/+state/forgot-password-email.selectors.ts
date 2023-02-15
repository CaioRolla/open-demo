import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ForgotPasswordEmailState, FEATURE_KEY } from './forgot-password-email.reducer';

export const selectState = createFeatureSelector<ForgotPasswordEmailState>(FEATURE_KEY);

export const selectLoading = createSelector(
  selectState,
  (state) => state.loading
);

export const selectError = createSelector(selectState, (state) => state.error);
