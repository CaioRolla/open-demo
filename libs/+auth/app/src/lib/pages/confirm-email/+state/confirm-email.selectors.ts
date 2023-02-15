import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ConfirmEmailState, FEATURE_KEY } from './confirm-email.reducer';

export const selectState = createFeatureSelector<ConfirmEmailState>(FEATURE_KEY);

export const selectLoading = createSelector(
  selectState,
  (state) => state.loading
);

export const selectError = createSelector(selectState, (state) => state.error);
