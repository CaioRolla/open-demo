import { createFeatureSelector, createSelector } from '@ngrx/store';

import { HomeState, FEATURE_KEY } from './home.reducer';

export const selectState = createFeatureSelector<HomeState>(FEATURE_KEY);

export const selectLoadingLists = createSelector(
  selectState,
  (state) => state.loadingLists
);

export const selectLoadingListsSilently = createSelector(
  selectState,
  (state) => state.loadingListsSilently
);

export const selectListsRes = createSelector(
  selectState,
  (state) => state.loadListsRes
);

export const selectListsResData = createSelector(
  selectListsRes,
  (res) => res?.data || []
);

export const selectListsResDataCount = createSelector(
  selectListsResData,
  (data) => data.length
);

export const selectLoadListsError = createSelector(
  selectState,
  (state) => state.loadListsError
);

export const selectListsQuery = createSelector(
  selectState,
  (state) => state.listsQuery
);

export const selectListsPage = createSelector(
  selectListsQuery,
  (query) => query?.page || 0
);

export const selectDisableNextLists = createSelector(
  selectListsRes,
  selectListsQuery,
  (res, query) => {
    return !res?.totalPages || res?.totalPages - 1 === query?.page;
  }
);

export const selectDisablePreviousLists = createSelector(
  selectListsPage,
  (page) => {
    const nextPage = page - 1;
    return nextPage < 0;
  }
);

export const selectPaginatedListsCount = createSelector(
  selectListsRes,
  (lists) => lists?.totalAmount || 0
);

export const selectDisplayEmptyMessage = createSelector(
  selectListsResData,
  selectLoadingLists,
  (lists, loading) => lists.length === 0 && !loading
);
