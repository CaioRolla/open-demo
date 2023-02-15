import { createReducer, on, Action } from '@ngrx/store';
import { ErrorResponseDto } from '@demo/shared/utils';

import * as DeleteProductActions from './delete-product.actions';

export const FEATURE_KEY = 'deleteProduct';

export interface DeleteProductState {
  deleting: boolean;
  error?: ErrorResponseDto | null;
}

export const initialState: DeleteProductState = {
  deleting: false,
};

const featureReducer = createReducer(
  initialState,
  on(DeleteProductActions.deleteProduct, (state, action) => ({
    ...state,
    deleting: true,
  })),
  on(DeleteProductActions.deleteProductSuccess, (state, action) => ({
    ...state,
    deleting: false,
  })),
  on(DeleteProductActions.deleteProductFailure, (state, action) => ({
    ...state,
    deleting: false,
    error: action.error,
  })),
  on(DeleteProductActions.resetState, (state, action) => ({
    ...initialState,
  }))
);

export function reducer(state: DeleteProductState | undefined, action: Action) {
  return featureReducer(state, action);
}
