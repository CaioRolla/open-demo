import { createReducer, on, Action } from '@ngrx/store';

import * as SaveProductActions from './save-product.actions';
import { Product, ProductData } from '@demo/wish-shared/core';
import { ErrorResponseDto } from '@demo/shared/utils';

export const FEATURE_KEY = 'saveProduct';

export interface SaveProductState {
  product?: Product | null;
  loadProductError?: ErrorResponseDto | null;
  loadingProduct: boolean;

  savingProduct: boolean;
  saveProductError?: ErrorResponseDto | null;

  loadingProductData: boolean;
  productData?: Partial<ProductData>;
  loadProductDataError?: ErrorResponseDto | null;
}

export const initialState: SaveProductState = {
  loadingProduct: false,

  savingProduct: false,

  loadingProductData: false,
};

const featureReducer = createReducer(
  initialState,
  on(SaveProductActions.loadProductData, (state, action) => ({
    ...state,
    loadingProductData: true,
  })),
  on(SaveProductActions.loadProductDataSuccess, (state, action) => ({
    ...state,
    loadingProductData: false,
    productData: action.res
  })),
  on(SaveProductActions.loadProductDataFailure, (state, action) => ({
    ...state,
    loadingProductData: false,
    loadProductDataError: action.error,
  })),

  on(SaveProductActions.saveProduct, (state, action) => ({
    ...state,
    savingProduct: true,
  })),
  on(SaveProductActions.saveProductSuccess, (state, action) => ({
    ...state,
    savingProduct: false,
    product: action.res,
  })),
  on(SaveProductActions.saveProductFailure, (state, action) => ({
    ...state,
    savingProduct: false,
    saveProductError: action.error,
  })),

  on(SaveProductActions.loadProduct, (state, action) => ({
    ...state,
    loadingProduct: true,
  })),
  on(SaveProductActions.loadProductSuccess, (state, action) => ({
    ...state,
    loadingProduct: false,
    product: action.res,
  })),
  on(SaveProductActions.loadProductFailure, (state, action) => ({
    ...state,
    loadingProduct: false,
    loadProductError: action.error,
  })),
  on(SaveProductActions.resetState, (state, action) => ({
    ...initialState,
  }))
);

export function reducer(state: SaveProductState | undefined, action: Action) {
  return featureReducer(state, action);
}
