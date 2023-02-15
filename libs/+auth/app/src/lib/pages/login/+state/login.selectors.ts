import { createFeatureSelector, createSelector } from '@ngrx/store';

import { LoginState, FEATURE_KEY } from './login.reducer';

export const selectState = createFeatureSelector<LoginState>(FEATURE_KEY);

export const selectLoading = createSelector(
  selectState,
  (state) => state.loading
);

export const selectError = createSelector(selectState, (state) => state.error);
