import { createReducer, on, Action } from '@ngrx/store';
import { ErrorResponseDto } from '@demo/shared/utils';
import { GetPublicListDto } from '@demo/wish-shared/core';

import * as PublicListActions from './public-list.actions';

export const FEATURE_KEY = 'publicList';

export interface PublicListState {
  loadingList: boolean;
  loadListError?: ErrorResponseDto | null;
  list?: GetPublicListDto | null;

  personName: string | null;
  personEmail: string | null;

  selectingProduct: boolean;
  selectingProductId?: string | null;
  selectProductError?: ErrorResponseDto | null;
}

export const initialState: PublicListState = {
  loadingList: false,

  personName: localStorage.getItem('_personName') || null,
  personEmail: localStorage.getItem('_personEmail') || null,

  selectingProduct: false,
};

const featureReducer = createReducer(
  initialState,
  on(PublicListActions.unselectProduct, (state, action) => ({
    ...state,
    selectingProduct: true,
    selectingProductId: action.productId,
  })),
  on(PublicListActions.unselectProductFailure, (state, action) => ({
    ...state,
    selectingProduct: false,
    selectingProductId: null,
    selectProductError: action.error,
  })),
  on(PublicListActions.unselectProductSuccess, (state, action) => ({
    ...state,
    selectingProduct: false,
    selectingProductId: null,
    list: {
      ...state.list,
      products: state.list?.products.map((p) => {
        if (p.id === action.productId) {
          return {
            ...p,
            takenBy: null,
          };
        }
        return p;
      }),
    } as any,
  })),
  on(PublicListActions.selectProduct, (state, action) => ({
    ...state,
    selectingProduct: true,
    selectingProductId: action.productId,
  })),
  on(PublicListActions.selectProductSuccess, (state, action) => ({
    ...state,
    selectingProduct: false,
    selectingProductId: null,
    list: {
      ...state.list,
      products: state.list?.products.map((p) => {
        if (p.id === action.res.id) {
          return {
            ...p,
            takenBy: state.personEmail || null,
          };
        }
        return p;
      }),
    } as any,
  })),
  on(PublicListActions.selectProductFailure, (state, action) => ({
    ...state,
    selectingProduct: false,
    selectingProductId: null,
    selectProductError: action.error,
  })),
  on(PublicListActions.setPerson, (state, action) => ({
    ...state,
    personName: action.name,
    personEmail: action.email,
  })),
  on(PublicListActions.loadList, (state, action) => ({
    ...state,
    loadingList: true,
  })),
  on(PublicListActions.loadListSuccess, (state, action) => ({
    ...state,
    loadingList: false,
    list: action.res,
    previewList: action.res,
  })),
  on(PublicListActions.loadListFailure, (state, action) => ({
    ...state,
    loadingList: false,
    loadListError: action.error,
  })),
  on(PublicListActions.resetState, (state, action) => ({
    ...initialState,
  }))
);

export function reducer(state: PublicListState | undefined, action: Action) {
  return featureReducer(state, action);
}
