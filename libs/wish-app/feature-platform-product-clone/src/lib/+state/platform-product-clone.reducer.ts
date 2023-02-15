import { createReducer, on, Action } from '@ngrx/store';
import { ErrorResponseDto, GetAllResponseDto } from '@demo/shared/utils';
import { GetAllPlatformProductDto } from '@demo/wish-shared/core';

import * as PlatformProductCloneActions from './platform-product-clone.actions';

export const FEATURE_KEY = 'platformProductClone';

export interface PlatformProductCloneState {
  listId?: string;

  loadingProducts: boolean;
  productsRes?: GetAllResponseDto<GetAllPlatformProductDto>;
  loadProductsError?: ErrorResponseDto | null;
  productsSearchQuery: string | null;

  cloningProducts: boolean;
}

export const initialState: PlatformProductCloneState = {
  loadingProducts: false,
  productsSearchQuery: null,
  cloningProducts: false
};

const featureReducer = createReducer(
  initialState,
  on(PlatformProductCloneActions.cloneProducts, (state, action) => ({
    ...state,
    cloningProducts: true
  })),
  on(PlatformProductCloneActions.cloneProductsSuccess, (state, action) => ({
    ...state,
    cloningProducts: false
  })),
  on(PlatformProductCloneActions.cloneProductsFailure, (state, action) => ({
    ...state,
    cloningProducts: false
  })),
  on(PlatformProductCloneActions.loadPlatformProducts, (state, action) => ({
    ...state,
    listId: action.listId,
    loadingProducts: true
  })),
  on(PlatformProductCloneActions.loadPlatformProductsSuccess, (state, action) => ({
    ...state,
    loadingProducts: false,
    productsRes: action.res
  })),
  on(PlatformProductCloneActions.loadPlatformProductsFailure, (state, action) => ({
    ...state,
    loadingProducts: false,
    loadProductsError: action.error
  })),
  on(PlatformProductCloneActions.setProductsSearchQuery, (state, action) => ({
    ...state,
    productsSearchQuery: action.query,
  })),
  on(PlatformProductCloneActions.resetState, (state, action) => ({
    ...initialState,
  }))
);

export function reducer(
  state: PlatformProductCloneState | undefined,
  action: Action
) {
  return featureReducer(state, action);
}
