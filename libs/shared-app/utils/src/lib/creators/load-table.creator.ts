import { inject } from '@angular/core';
import {
  createAction,
  createSelector,
  DefaultProjectorFn,
  MemoizedSelector,
  on,
  props,
  Store,
} from '@ngrx/store';
import {
  ErrorResponseDto,
  GetAllQueryDto,
  GetAllResponseDto,
} from '@demo/shared/utils';

export interface TableState<Query extends GetAllQueryDto, Data> {
  loading: boolean;
  loadingSilently: boolean;
  query: Query | null;
  res: GetAllResponseDto<Data> | null;
  error: ErrorResponseDto | null;
}

export const tableInitialState = {
  loadingSilently: false,
  loading: false,
  query: null,
  res: null,
  error: null,
};

export const createTableActions = <Query extends GetAllQueryDto, Data>(
  key: string
) => {
  return {
    nextPage: createAction(`${key} Load table data previous page`),
    previousPage: createAction(`${key} Load table data next page`),
    load: createAction(`${key} Load table data`, props<{ query: Query | null, silent?:boolean }>()),
    loadSuccess: createAction(
      `${key} Loaded table data successfully`,
      props<{ res: GetAllResponseDto<Data> }>()
    ),
    loadFailure: createAction(
      `${key} Failed to load table data`,
      props<{ error: ErrorResponseDto }>()
    ),
  };
};

export const createTableReducers = (actionKey: string, stateKey: string): any => {
  const actions = createTableActions(actionKey);
  return [
    on(actions.nextPage, (state: any, action) => ({
      ...state,
      [stateKey]: {
        ...state[stateKey],
        loadingSilently: true,
        query: state[stateKey]?.query
          ? {
              ...state[stateKey]?.query,
              page: (state[stateKey].query.page || 0) + 1,
            }
          : tableInitialState.query,
      },
    })),
    on(actions.previousPage, (state: any, action) => ({
      ...state,
      [stateKey]: {
        ...state[stateKey],
        loadingSilently: true,
        query: state[stateKey]?.query
          ? {
              ...state[stateKey]?.query,
              page: (state[stateKey].query?.page || 0) - 1,
            }
          : tableInitialState.query,
      },
    })),
    on(actions.load, (state: any, action) => ({
      ...state,
      [stateKey]: {
        ...state[stateKey],
        query: action.query ? action.query : {  ...state[stateKey].query },
        loading: !action.silent,
        loadingSilently: action.silent
      },
    })),
    on(actions.loadSuccess, (state: any, action) => ({
      ...state,
      [stateKey]: {
        ...state[stateKey],
        loading: false,
        loadingSilently: false,
        res: action.res,
        error: null,
      },
    })),
    on(actions.loadFailure, (state: any, action) => ({
      ...state,
      [stateKey]: {
        ...state[stateKey],
        loading: false,
        loadingSilently: false,
        error: action.error,
      },
    })),
  ];
};

export const createTableSelectors = <Query extends GetAllQueryDto, Data>(
  selectState: MemoizedSelector<
    object,
    TableState<Query, Data>,
    DefaultProjectorFn<TableState<Query, Data>>
  >
) => {
  const selectLoading = createSelector(selectState, (state) => state.loading);
  const selectLoadingSilently = createSelector(
    selectState,
    (state) => state.loadingSilently
  );
  const selectQuery = createSelector(selectState, (state) => state.query);
  const selectPage = createSelector(selectQuery, (query) => query?.page || 0);
  const selectRes = createSelector(selectState, (state) => state.res);
  const selectError = createSelector(selectState, (state) => state.error);
  const selectData = createSelector(selectRes, (res) => res?.data || []);
  const selectTotalAmount = createSelector(
    selectRes,
    (res) => res?.totalAmount || 0
  );
  const selectTotalPages = createSelector(
    selectRes,
    (res) => res?.totalPages || 0
  );
  const selectDisableNext = createSelector(
    selectTotalPages,
    selectPage,
    (totalPages, page) => !totalPages || totalPages - 1 === page
  );
  const selectDisablePrevious = createSelector(
    selectPage,
    (page) => page - 1 < 0
  );
  const selectPaginatedCount = createSelector(
    selectData,
    (data) => data.length
  );
  const selectDisplayEmptyMessage = createSelector(
    selectData,
    selectLoading,
    (data, loading) => data.length === 0 && !loading
  );

  return {
    selectLoading,
    selectLoadingSilently,
    selectQuery,
    selectRes,
    selectError,
    selectData,
    selectTotalAmount,
    selectTotalPages,
    selectDisableNext,
    selectDisablePrevious,
    selectPaginatedCount,
    selectDisplayEmptyMessage,
  };
};

export const createTableFacade = <Query extends GetAllQueryDto, Data>(
  actionKey: string,
  selectState: MemoizedSelector<
    object,
    TableState<Query, Data>,
    DefaultProjectorFn<TableState<Query, Data>>
  >
) => {
  const store = inject(Store);
  const selectors = createTableSelectors(selectState);
  const actions = createTableActions(actionKey);
  return {
    loading$: store.select(selectors.selectLoading),
    loadingSilently$: store.select(selectors.selectLoadingSilently),
    data$: store.select(selectors.selectData),
    query$: store.select(selectors.selectQuery),
    totalAmount$: store.select(selectors.selectTotalAmount),
    totalPages$: store.select(selectors.selectTotalPages),
    displayEmptyMessage$: store.select(selectors.selectDisplayEmptyMessage),
    paginatedCount$: store.select(selectors.selectPaginatedCount),
    disablePrevious$: store.select(selectors.selectDisablePrevious),
    disableNext$: store.select(selectors.selectDisableNext),
    load: (query: Query, silent?:boolean) => store.dispatch(actions.load({ query, silent })),
    reload: () => store.dispatch(actions.load({ query: null })),
    nextPage: () => store.dispatch(actions.nextPage()),
    previousPage: () => store.dispatch(actions.previousPage()),
  };
};


