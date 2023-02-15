import { createReducer, on, Action } from '@ngrx/store';
import {
  ErrorResponseDto,
  GetAllQueryDto,
  GetAllResponseDto,
} from '@demo/shared/utils';
import { GetAllListDto } from '@demo/wish-shared/core';

import * as HomeActions from './home.actions';

export const FEATURE_KEY = 'home';

export interface HomeState {
  listsQuery?: GetAllQueryDto;
  loadListsRes?: GetAllResponseDto<GetAllListDto>;
  loadingLists: boolean;
  loadingListsSilently: boolean;
  loadListsError?: ErrorResponseDto | null;
}

export const initialState: HomeState = {
  loadingLists: false,
  loadingListsSilently: false,
};

const featureReducer = createReducer(
  initialState,
  on(HomeActions.nextLists, (state, action) => ({
    ...state,
    listsQuery: state.listsQuery
      ? {
          ...state.listsQuery,
          page: (state.listsQuery.page || 0) + 1,
        }
      : {
          page: 0,
        },
    loadingListsSilently: true,
  })),
  on(HomeActions.previousLists, (state, action) => ({
    ...state,
    listsQuery: state.listsQuery
      ? {
          ...state.listsQuery,
          page: (state.listsQuery.page || 0) - 1,
        }
      : {
          page: 0,
        },
    loadingListsSilently: true,
  })),
  on(HomeActions.loadLists, (state, action) => ({
    ...state,
    loadingLists: true,
    listsQuery: action.query,
  })),
  on(HomeActions.loadListsSuccess, (state, action) => ({
    ...state,
    loadingLists: false,
    loadListsRes: action.res,
    loadListsError: null,
    loadingListsSilently: false,
  })),
  on(HomeActions.loadListsFailure, (state, action) => ({
    ...state,
    loadingLists: false,
    loadListsError: action.error,
    loadingListsSilently: false,
  })),
  on(HomeActions.resetState, (state, action) => ({
    ...initialState,
  }))
);

export function reducer(state: HomeState | undefined, action: Action) {
  return featureReducer(state, action);
}
