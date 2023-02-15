import { createAction, props } from '@ngrx/store';
import { ErrorResponseDto, GetAllResponseDto } from '@demo/shared/utils';
import { GetAllProductDto, List, PatchListDto } from '@demo/wish-shared/core';

export enum ManageListAction {
  RESET_STATE = '[wish-app-feature-manage-list] Reset state',

  LOAD_LIST = '[wish-app-feature-manage-list] Load list',
  LOAD_LIST_SUCCESS = '[wish-app-feature-manage-list] Loaded list successfully',
  LOAD_LIST_FAILURE = '[wish-app-feature-manage-list] Failed to load list',

  LOAD_PRODUCTS = '[wish-app-feature-manage-list] Load products',
  LOAD_PRODUCTS_SUCCESS = '[wish-app-feature-manage-list] Loaded products successfully',
  LOAD_PRODUCTS_FAILURE = '[wish-app-feature-manage-list] Failed to load products',

  PATCH_LIST = '[wish-app-feature-manage-list] Patch list',
  PATCH_LIST_SUCCESS = '[wish-app-feature-manage-list] Patched list successfully',
  PATCH_LIST_FAILURE = '[wish-app-feature-manage-list] Failed to Patch list',

  PREVIEW_LIST_CHANGED = '[wish-app-feature-manage-list] List changed',
  RESET_PREVIEW = '[wish-app-feature-manage-list] Reset preview',

  SET_PRODUCTS_SEARCH_QUERY ='[wish-app-feature-manage-list] Search query changed'
}

export const setProductsSearchQuery = createAction(
  ManageListAction.SET_PRODUCTS_SEARCH_QUERY,
  props<{ query: string | null }>()
);

export const resetPreview = createAction(ManageListAction.RESET_PREVIEW);

export const previewListChanged = createAction(
  ManageListAction.PREVIEW_LIST_CHANGED,
  props<{ list: Partial<List> }>()
);

export const resetState = createAction(ManageListAction.RESET_STATE);

export const loadProducts = createAction(
  ManageListAction.LOAD_PRODUCTS,
  props<{ listId: string }>()
);

export const loadProductsSuccess = createAction(
  ManageListAction.LOAD_PRODUCTS_SUCCESS,
  props<{ res: GetAllResponseDto<GetAllProductDto> }>()
);

export const loadProductsFailure = createAction(
  ManageListAction.LOAD_PRODUCTS_FAILURE,
  props<{ error: ErrorResponseDto }>()
);

export const loadList = createAction(
  ManageListAction.LOAD_LIST,
  props<{ listId: string }>()
);

export const loadListSuccess = createAction(
  ManageListAction.LOAD_LIST_SUCCESS,
  props<{ res: List }>()
);

export const loadListFailure = createAction(
  ManageListAction.LOAD_LIST_FAILURE,
  props<{ error: ErrorResponseDto }>()
);

export const patchList = createAction(
  ManageListAction.PATCH_LIST,
  props<{ patchDto: PatchListDto, showSuccess: boolean }>()
);

export const patchListSuccess = createAction(
  ManageListAction.PATCH_LIST_SUCCESS,
  props<{ res: List, showSuccess: boolean }>()
);

export const patchListFailure = createAction(
  ManageListAction.PATCH_LIST_FAILURE,
  props<{ error: ErrorResponseDto }>()
);
