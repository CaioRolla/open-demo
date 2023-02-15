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

export interface SaveDataState<SaveDto, Response> {
  saving: boolean;
  error: ErrorResponseDto | null;
  res: Response | null;
}

export const saveDataInitialState = {
  saving: false,
  error: null,
  res: null,
};

export const createSaveDataActions = <SaveDto, Response>(key: string) => {
  return {
    save: createAction(`${key} Save data`, props<{ dto: SaveDto }>()),
    saveSuccess: createAction(
      `${key} Loaded data successfully`,
      props<{ res: Response }>()
    ),
    saveFailure: createAction(
      `${key} Failed to save data`,
      props<{ error: ErrorResponseDto }>()
    ),
  };
};

export const createSaveDataReducers = (actionKey: string, stateKey: string):any => {
  const actions = createSaveDataActions(actionKey);
  return [
    on(actions.save, (state: any, action) => ({
      ...state,
      [stateKey]: {
        ...state[stateKey],
        saving: true,
      },
    })),
    on(actions.saveSuccess, (state: any, action) => ({
      ...state,
      [stateKey]: {
        ...state[stateKey],
        saving: false,
        res: action.res,
        error: null,
      },
    })),
    on(actions.saveFailure, (state: any, action) => ({
      ...state,
      [stateKey]: {
        ...state[stateKey],
        saving: false,
        error: action.error,
      },
    })),
  ];
};

export const createSaveDataSelectors = <SaveDto, Response>(
  selectState: MemoizedSelector<
    object,
    SaveDataState<SaveDto, Response>,
    DefaultProjectorFn<SaveDataState<SaveDto, Response>>
  >
) => {
  const selectLoading = createSelector(selectState, (state) => state.saving);
  const selectError = createSelector(selectState, (state) => state.error);
  const selectRes = createSelector(selectState, (state) => state.res);

  return {
    selectLoading,
    selectError,
    selectRes,
  };
};

type SelectState<SaveDto, Response> = MemoizedSelector<
  object,
  SaveDataState<SaveDto, Response>,
  DefaultProjectorFn<SaveDataState<SaveDto, Response>>
>;

export const createSaveDataFacade = <SaveDto, Response>(
  actionKey: string,
  selectState: SelectState<SaveDto, Response>
) => {
  const store = inject(Store);
  const selectors = createSaveDataSelectors(selectState);
  const actions = createSaveDataActions(actionKey);
  return {
    saving$: store.select(selectors.selectLoading),
    res$: store.select(selectors.selectRes),
    error$: store.select(selectors.selectError),
    save: (dto: SaveDto) => store.dispatch(actions.save({ dto })),
  };
};

