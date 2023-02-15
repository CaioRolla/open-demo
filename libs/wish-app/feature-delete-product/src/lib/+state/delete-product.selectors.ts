import { createFeatureSelector, createSelector } from '@ngrx/store';

import { DeleteProductState, FEATURE_KEY } from './delete-product.reducer';

export const selectState = createFeatureSelector<DeleteProductState>(FEATURE_KEY);

export const selectDeleting = createSelector(
  selectState,
  (state) => state.deleting
);

export const selectError = createSelector(selectState, (state) => state.error);
