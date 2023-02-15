import { createReducer, on, Action } from '@ngrx/store';

import * as ManageListActions from './manage-list.actions';
import { GetAllProductDto, List } from '@demo/wish-shared/core';
import { ErrorResponseDto, GetAllResponseDto } from '@demo/shared/utils';

export const FEATURE_KEY = 'manageList';

export interface ManageListState {
  loadingList: boolean;
  loadListError?: ErrorResponseDto;
  list?: List | null;

  previewList?: List | null;

  productsRes?: GetAllResponseDto<GetAllProductDto>;
  loadProductsError?: ErrorResponseDto;
  loadingProducts: boolean;
  productsSearchQuery: string | null

  patchingList: boolean;
  patchListError?: ErrorResponseDto | null;
}

export const initialState: ManageListState = {
  loadingList: false,

  loadingProducts: false,

  patchingList: false,

  productsSearchQuery: null
};

const featureReducer = createReducer(
  initialState,

  on(ManageListActions.resetPreview, (state, action) => {
    return {
      ...state,
      previewList: {
        ...state.list,
      } as List,
    };
  }),
  on(ManageListActions.previewListChanged, (state, action) => {
    return {
      ...state,
      previewList: {
        ...state.previewList,
        ...action.list,
      } as List,
    };
  }),
  on(ManageListActions.patchList, (state, action) => ({
    ...state,
    patchingList: true,
  })),
  on(ManageListActions.setProductsSearchQuery, (state, action) => ({
    ...state,
    productsSearchQuery: action.query,
  })),
  on(ManageListActions.patchListSuccess, (state, action) => ({
    ...state,
    patchingList: false,
    list: action.res,
    previewList: action.res,
  })),
  on(ManageListActions.patchListFailure, (state, action) => ({
    ...state,
    patchingList: false,
    patchListError: action.error,
  })),

  on(ManageListActions.loadProducts, (state, action) => ({
    ...state,
    loadingProducts: true,
  })),
  on(ManageListActions.loadProductsSuccess, (state, action) => ({
    ...state,
    loadingProducts: false,
    productsRes: action.res,
    productsSearchQuery: null
  })),
  on(ManageListActions.loadProductsFailure, (state, action) => ({
    ...state,
    loadingProducts: false,
    loadProductsError: action.error,
  })),

  on(ManageListActions.loadList, (state, action) => ({
    ...state,
    loadingList: true,
  })),
  on(ManageListActions.loadListSuccess, (state, action) => ({
    ...state,
    loadingList: false,
    list: action.res,
    previewList: action.res,
  })),
  on(ManageListActions.loadListFailure, (state, action) => ({
    ...state,
    loadingList: false,
    loadListError: action.error,
  })),
  on(ManageListActions.resetState, (state, action) => ({
    ...initialState,
  }))
);

export function reducer(state: ManageListState | undefined, action: Action) {
  return featureReducer(state, action);
}
