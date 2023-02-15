import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  PlatformProductCloneState,
  FEATURE_KEY,
} from './platform-product-clone.reducer';

export const selectState =
  createFeatureSelector<PlatformProductCloneState>(FEATURE_KEY);

export const selectLoadingProducts = createSelector(
  selectState,
  (state) => state.loadingProducts
);

export const selectLoadProductsError = createSelector(
  selectState,
  (state) => state.loadProductsError
);

export const selectProductsRes = createSelector(
  selectState,
  (state) => state.productsRes
);

export const selectListId = createSelector(
  selectState,
  (state) => state.listId
);

export const selectCloningProducts = createSelector(
  selectState,
  (state) => state.cloningProducts
);

export const selectProducts = createSelector(
  selectProductsRes,
  (res) => res?.data || []
);

export const selectProductsSearchQuery = createSelector(
  selectState,
  (state) => state.productsSearchQuery
);

export const selectFilteredProducts = createSelector(
  selectProducts,
  selectProductsSearchQuery,
  (products, query) =>
    products.filter((product) => {
      if (!query) {
        return true;
      }

      return `${product.name || ''} ${product.desc || ''} ${product.url || ''}`
        .toLowerCase()
        .includes(query.toLowerCase());
    })
);

export const selectDisplayEmptyMessage = createSelector(
  selectFilteredProducts,
  selectLoadingProducts,
  (products, loading) => products.length === 0 && !loading
);

export const selectFilteredProductsCount = createSelector(
  selectFilteredProducts,
  products => products.length
);
