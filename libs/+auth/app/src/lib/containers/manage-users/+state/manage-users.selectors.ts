import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ManageUsersState, FEATURE_KEY } from './manage-users.reducer';

export const selectState = createFeatureSelector<ManageUsersState>(FEATURE_KEY);

export const selectLoadingUsers = createSelector(
  selectState,
  (state) => state.loadingUsers
);

export const selectLoadingUsersSilently = createSelector(
  selectState,
  (state) => state.loadingUsersSilently
);

export const selectUsersRes = createSelector(
  selectState,
  (state) => state.loadUsersRes
);

export const selectUsersResData = createSelector(
  selectUsersRes,
  (res) => res?.data || []
);

export const selectUsersResDataCount = createSelector(
  selectUsersResData,
  (data) => data.length
);

export const selectLoadUsersError = createSelector(
  selectState,
  (state) => state.loadUsersError
);

export const selectUsersQuery = createSelector(
  selectState,
  (state) => state.usersQuery
);

export const selectUsersPage = createSelector(
  selectUsersQuery,
  (query) => query?.page || 0
);

export const selectDisableNextUsers = createSelector(
  selectUsersRes,
  selectUsersQuery,
  (res, query) => {
    return !res?.totalPages || res?.totalPages - 1 === query?.page;
  }
);

export const selectDisablePreviousUsers = createSelector(
  selectUsersPage,
  (page) => {
    const nextPage = page - 1;
    return nextPage < 0;
  }
);

export const selectPaginatedUsersCount = createSelector(
  selectUsersRes,
  (users) => users?.totalAmount || 0
);

export const selectDisplayEmptyMessage = createSelector(
  selectUsersResData,
  selectLoadingUsers,
  (users, loading) => users.length === 0 && !loading
);

export const selectPatchingUser = createSelector(
  selectState,
  (state) => state.patchingUser
);

export const selectPatchingUserId = createSelector(
  selectState,
  (state) => state.patchingUserId
);

export const selectPatchUserError = createSelector(
  selectState,
  (state) => state.patchUserError
);
