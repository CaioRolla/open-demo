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
import { ErrorResponseDto } from '@demo/shared/utils';

export interface DataState<Data> {
  identifier: string | null;
  loading: boolean;
  error: ErrorResponseDto | null;
  data: Data | null;
}

export const dataInitialState = {
  loading: false,
  data: null,
  error: null,
  identifier: null
};

export const createDataActions = <Data>(key: string) => {
  return {
    load: createAction(`${key} Load data`, props<{ identifier: string }>()),
    loadSuccess: createAction(
      `${key} Loaded data successfully`,
      props<{ res: Data }>()
    ),
    loadFailure: createAction(
      `${key} Failed to load data`,
      props<{ error: ErrorResponseDto }>()
    ),
  };
};

export const createDataReducers = (actionKey: string, stateKey: string): any => {
  const actions = createDataActions(actionKey);
  return [
    on(actions.load, (state: any, action) => ({
      ...state,
      [stateKey]: {
        ...state[stateKey],
        loading: true,
      },
    })),
    on(actions.loadSuccess, (state: any, action) => ({
      ...state,
      [stateKey]: {
        ...state[stateKey],
        loading: false,
        data: action.res,
        error: null,
      },
    })),
    on(actions.loadFailure, (state: any, action) => ({
      ...state,
      [stateKey]: {
        ...state[stateKey],
        loading: false,
        error: action.error,
      },
    })),
  ];
};

export const createDataSelectors = <Data>(
  selectState: MemoizedSelector<
    object,
    DataState<Data>,
    DefaultProjectorFn<DataState<Data>>
  >
) => {
  const selectLoading = createSelector(selectState, (state) => state.loading);
  const selectError = createSelector(selectState, (state) => state.error);
  const selectData = createSelector(selectState, (state) => state.data);

  return {
    selectLoading,
    selectError,
    selectData,
  };
};

type SelectState<Data> = MemoizedSelector<
  object,
  DataState<Data>,
  DefaultProjectorFn<DataState<Data>>
>;

export const createDataFacade = <Data>(
  actionKey: string,
  selectState: SelectState<Data>
) => {
  let lastIdentifier: string;
  const store = inject(Store);
  const selectors = createDataSelectors(selectState);
  const actions = createDataActions(actionKey);
  return {
    loading$: store.select(selectors.selectLoading),
    data$: store.select(selectors.selectData),
    error$: store.select(selectors.selectError),
    load: (identifier: string) => {
      lastIdentifier = identifier;
      store.dispatch(actions.load({ identifier }));
    },
    reload: () => store.dispatch(actions.load({ identifier: lastIdentifier })),
  };
};
