import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CreateListState, FEATURE_KEY } from './create-list.reducer';

export const selectState = createFeatureSelector<CreateListState>(FEATURE_KEY);

export const selectCreatingList = createSelector(
  selectState,
  (state) => state.creatingList
);
