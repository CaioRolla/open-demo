import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SaveProductState, FEATURE_KEY } from './save-product.reducer';

export const selectState = createFeatureSelector<SaveProductState>(FEATURE_KEY);

export const selectProduct = createSelector(
  selectState,
  (state) => state.product
);

export const selectLoadingProduct = createSelector(
  selectState,
  (state) => state.loadingProduct
);

export const selectLoadProductError = createSelector(
  selectState,
  (state) => state.loadProductError
);


export const selectSavingProduct = createSelector(
  selectState,
  (state) => state.savingProduct
);

export const selectSaveProductError = createSelector(
  selectState,
  (state) => state.saveProductError
);

export const selectLoadingProductData = createSelector(
  selectState,
  (state) => state.loadingProductData
);

export const selectProductData = createSelector(
  selectState,
  (state) => state.productData
);

export const selectLoadProductDataError = createSelector(
  selectState,
  (state) => state.loadProductDataError
);