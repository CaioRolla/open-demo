import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PublicListState, FEATURE_KEY } from './public-list.reducer';

export const selectState = createFeatureSelector<PublicListState>(FEATURE_KEY);

export const selectLoadingList = createSelector(
  selectState,
  (state) => state.loadingList
);

export const selectList = createSelector(selectState, (state) => state.list);

export const selectLoadListError = createSelector(
  selectState,
  (state) => state.loadListError
);

export const selectPersonName = createSelector(
  selectState,
  (state) => state.personName
);

export const selectPersonEmail = createSelector(
  selectState,
  (state) => state.personEmail
);


export const selectSelectingProduct = createSelector(
  selectState,
  (state) => state.selectingProduct
);

export const selectSelectingProductId = createSelector(
  selectState,
  (state) => state.selectingProductId
);

export const selectSelectProductError = createSelector(
  selectState,
  (state) => state.selectProductError
);


