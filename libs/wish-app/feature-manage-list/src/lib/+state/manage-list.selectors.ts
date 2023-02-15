import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PublicGetAllPublicProductDto } from '@demo/wish-shared/core';

import { ManageListState, FEATURE_KEY } from './manage-list.reducer';

export const selectState = createFeatureSelector<ManageListState>(FEATURE_KEY);

export const selectLoadingList = createSelector(
  selectState,
  (state) => state.loadingList
);

export const selectList = createSelector(selectState, (state) => state.list);

export const selectPreviewList = createSelector(
  selectState,
  (state) => state.previewList
);

export const selectLoadListError = createSelector(
  selectState,
  (state) => state.loadListError
);

export const selectProductsSearchQuery = createSelector(
  selectState,
  (state) => state.productsSearchQuery
);

export const selectProductsRes = createSelector(
  selectState,
  (state) => state.productsRes
);

export const selectProducts = createSelector(
  selectProductsRes,
  (res) => res?.data || []
);

export const selectLoadProductsError = createSelector(
  selectState,
  (state) => state.loadProductsError
);

export const selectLoadingProducts = createSelector(
  selectState,
  (state) => state.loadingProducts
);

export const selectPatchingList = createSelector(
  selectState,
  (state) => state.patchingList
);

export const selectPatchListError = createSelector(
  selectState,
  (state) => state.patchListError
);

export const selectPreviewProducts = createSelector(
  selectProducts,
  (products) =>
    products
      ? products.map((p) => {
          return {
            ...p,
            takenBy: null,
          } as PublicGetAllPublicProductDto;
        })
      : []
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


export const selectFilteredProductsCount = createSelector(
  selectFilteredProducts,
  products => products.length
);

export const selectDisplayEmptyMessage = createSelector(
  selectFilteredProducts,
  selectLoadingProducts,
  (products, loading) => products.length === 0 && !loading
);
