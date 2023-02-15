import { createAction, props } from '@ngrx/store';

import { Product, ProductData } from '@demo/wish-shared/core';
import { ErrorResponseDto } from '@demo/shared/utils';

export enum SaveProductAction {
  RESET_STATE = '[wish-app-feature-save-product] Reset state',

  LOAD_PRODUCT = '[wish-app-feature-save-product] Load product',
  LOAD_PRODUCT_SUCCESS = '[wish-app-feature-save-product] Loaded product successfully',
  LOAD_PRODUCT_FAILURE = '[wish-app-feature-save-product] Failed to load product',

  SAVE_PRODUCT = '[wish-app-feature-save-product] Save product',
  SAVE_PRODUCT_SUCCESS = '[wish-app-feature-save-product] Saved product successfully',
  SAVE_PRODUCT_FAILURE = '[wish-app-feature-save-product] Failed to save product',

  LOAD_PRODUCT_DATA = '[wish-app-feature-save-product] Load product data',
  LOAD_PRODUCT_DATA_SUCCESS = '[wish-app-feature-save-product] Loaded product data successfully',
  LOAD_PRODUCT_DATA_FAILURE = '[wish-app-feature-save-product] Failed to load product data',
}

export const saveProduct = createAction(
  SaveProductAction.SAVE_PRODUCT,
  props<{ saveDto: any }>()
);

export const saveProductSuccess = createAction(
  SaveProductAction.SAVE_PRODUCT_SUCCESS,
  props<{ res: Product }>()
);

export const saveProductFailure = createAction(
  SaveProductAction.SAVE_PRODUCT_FAILURE,
  props<{ error: ErrorResponseDto }>()
);

export const resetState = createAction(SaveProductAction.RESET_STATE);

export const loadProduct = createAction(
  SaveProductAction.LOAD_PRODUCT,
  props<{ productId: string }>()
);

export const loadProductSuccess = createAction(
  SaveProductAction.LOAD_PRODUCT_SUCCESS,
  props<{ res: Product }>()
);

export const loadProductFailure = createAction(
  SaveProductAction.LOAD_PRODUCT_FAILURE,
  props<{ error: ErrorResponseDto }>()
);

export const loadProductData = createAction(
  SaveProductAction.LOAD_PRODUCT_DATA,
  props<{ url: string }>()
);

export const loadProductDataSuccess = createAction(
  SaveProductAction.LOAD_PRODUCT_DATA_SUCCESS,
  props<{ res: Partial<ProductData> }>()
);

export const loadProductDataFailure = createAction(
  SaveProductAction.LOAD_PRODUCT_DATA_FAILURE,
  props<{ error: ErrorResponseDto }>()
);

