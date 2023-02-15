import { createAction, props } from '@ngrx/store';
import { ErrorResponseDto } from '@demo/shared/utils';

export enum DeleteProductAction {
  DELETE_PRODUCT = '[wish-app-feature-delete-product] Delete product',
  DELETE_PRODUCT_SUCCESS = '[wish-app-feature-delete-product] Deleted product successfully',
  DELETE_PRODUCT_FAILURE = '[wish-app-feature-delete-product] Failed to delete product',

  RESET_STATE = '[wish-app-feature-delete-product] Reset state',
}

export const resetState = createAction(DeleteProductAction.RESET_STATE);

export const deleteProduct = createAction(
  DeleteProductAction.DELETE_PRODUCT,
  props<{ productId: string }>()
);

export const deleteProductSuccess = createAction(
  DeleteProductAction.DELETE_PRODUCT_SUCCESS
);

export const deleteProductFailure = createAction(
  DeleteProductAction.DELETE_PRODUCT_FAILURE,
  props<{ error: ErrorResponseDto }>()
);
