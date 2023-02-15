import { createAction, props } from '@ngrx/store';
import { ErrorResponseDto, GetAllResponseDto } from '@demo/shared/utils';
import { GetAllPlatformProductDto, Product } from '@demo/wish-shared/core';

export enum PlatformProductCloneAction {
  RESET_STATE = '[wish-app-feature-platform-product-clone] Reset state',

  LOAD_PLATFORM_PRODUCTS = '[wish-app-feature-platform-product-clone] Load platform products',
  LOAD_PLATFORM_PRODUCTS_SUCCESS = '[wish-app-feature-platform-product-clone] Loaded platform products',
  LOAD_PLATFORM_PRODUCTS_FAILURE = '[wish-app-feature-platform-product-clone] Failed to load platform products',

  CLONE_PRODUCTS = '[wish-app-feature-platform-product-clone] Clone products',
  CLONE_PRODUCTS_SUCCESS = '[wish-app-feature-platform-product-clone] Cloned products',
  CLONE_PRODUCTS_FAILURE = '[wish-app-feature-platform-product-clone] Failed to clone products',

  SET_PRODUCTS_SEARCH_QUERY ='[wish-app-feature-platform-product-clone] Search query changed'
}

export const cloneProducts = createAction(
  PlatformProductCloneAction.CLONE_PRODUCTS,
  props<{ productIds: string[] }>()
);

export const cloneProductsSuccess = createAction(
  PlatformProductCloneAction.CLONE_PRODUCTS_SUCCESS,
  props<{ res: Product[] }>()
);

export const cloneProductsFailure = createAction(
  PlatformProductCloneAction.CLONE_PRODUCTS_FAILURE,
  props<{ error: ErrorResponseDto }>()
);

export const setProductsSearchQuery = createAction(
  PlatformProductCloneAction.SET_PRODUCTS_SEARCH_QUERY,
  props<{ query: string | null }>()
);

export const loadPlatformProducts = createAction(
  PlatformProductCloneAction.LOAD_PLATFORM_PRODUCTS,
  props<{ listId: string }>()
);

export const loadPlatformProductsSuccess = createAction(
  PlatformProductCloneAction.LOAD_PLATFORM_PRODUCTS_SUCCESS,
  props<{ res: GetAllResponseDto<GetAllPlatformProductDto> }>()
);

export const loadPlatformProductsFailure = createAction(
  PlatformProductCloneAction.LOAD_PLATFORM_PRODUCTS_FAILURE,
  props<{ error: ErrorResponseDto }>()
);

export const resetState = createAction(PlatformProductCloneAction.RESET_STATE);
