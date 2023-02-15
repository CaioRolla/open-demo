import { createAction, props } from '@ngrx/store';
import { ErrorResponseDto } from '@demo/shared/utils';
import { GetPublicListDto, Product, SelectProductResponseDto } from '@demo/wish-shared/core';

export enum PublicListAction {
  LOAD_LIST = '[wish-app-feature-public-list] Load list',
  LOAD_LIST_SUCCESS = '[wish-app-feature-public-list] Loaded list successfully',
  LOAD_LIST_FAILURE = '[wish-app-feature-public-list] Failed to load list',

  RESET_STATE = '[wish-app-feature-public-list] Reset state',

  SET_PERSON = '[wish-app-feature-public-list] Set person',

  SELECT_PRODUCT = '[wish-app-feature-public-list] Selected product',
  SELECT_PRODUCT_SUCCESS = '[wish-app-feature-public-list] Selected product successfully',
  SELECT_PRODUCT_FAILURE = '[wish-app-feature-public-list] Failed to select product',

  UNSELECT_PRODUCT = '[wish-app-feature-public-list] Unselected product',
  UNSELECT_PRODUCT_SUCCESS = '[wish-app-feature-public-list] Unselected product successfully',
  UNSELECT_PRODUCT_FAILURE = '[wish-app-feature-public-list] Failed to Unselected product',
}

export const unselectProduct = createAction(
  PublicListAction.UNSELECT_PRODUCT,
  props<{ productId: string }>()
);

export const unselectProductSuccess = createAction(
  PublicListAction.UNSELECT_PRODUCT_SUCCESS,
  props<{ productId: string }>()
);

export const unselectProductFailure = createAction(
  PublicListAction.UNSELECT_PRODUCT_FAILURE,
  props<{ error: ErrorResponseDto }>()
);

export const selectProduct = createAction(
  PublicListAction.SELECT_PRODUCT,
  props<{ productId: string }>()
);

export const selectProductSuccess = createAction(
  PublicListAction.SELECT_PRODUCT_SUCCESS,
  props<{ res: SelectProductResponseDto }>()
);

export const selectProductFailure = createAction(
  PublicListAction.SELECT_PRODUCT_FAILURE,
  props<{ error: ErrorResponseDto }>()
);

export const resetState = createAction(PublicListAction.RESET_STATE);

export const loadList = createAction(
  PublicListAction.LOAD_LIST,
  props<{ listSlug: string }>()
);

export const loadListSuccess = createAction(
  PublicListAction.LOAD_LIST_SUCCESS,
  props<{ res: GetPublicListDto }>()
);

export const loadListFailure = createAction(
  PublicListAction.LOAD_LIST_FAILURE,
  props<{ error: ErrorResponseDto }>()
);

export const setPerson = createAction(
  PublicListAction.SET_PERSON,
  props<{ name: string; email: string }>()
);
