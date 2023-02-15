import { createFeatureSelector, createSelector } from '@ngrx/store';

import { DeleteListState, FEATURE_KEY } from './delete-list.reducer';

export const selectState = createFeatureSelector<DeleteListState>(FEATURE_KEY);

export const selectDeleting = createSelector(
  selectState,
  (state) => state.deleting
);

export const selectError = createSelector(selectState, (state) => state.error);
