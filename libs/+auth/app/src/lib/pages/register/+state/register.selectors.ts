import { createFeatureSelector, createSelector } from '@ngrx/store';

import { RegisterState, FEATURE_KEY } from './register.reducer';

export const selectState = createFeatureSelector<RegisterState>(FEATURE_KEY);

export const selectLoading = createSelector(
  selectState,
  (state) => state.loading
);

export const selectError = createSelector(selectState, (state) => state.error);
