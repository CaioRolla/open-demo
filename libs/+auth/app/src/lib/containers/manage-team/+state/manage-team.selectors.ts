import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ManageTeamState, FEATURE_KEY } from './manage-team.reducer';

export const selectState = createFeatureSelector<ManageTeamState>(FEATURE_KEY);

export const selectLoadingInvites = createSelector(
  selectState,
  (state) => state.loadingInvites
);

export const selectLoadingInvitesSilently = createSelector(
  selectState,
  (state) => state.loadingInvitesSilently
);

export const selectInvitesRes = createSelector(
  selectState,
  (state) => state.loadInvitesRes
);

export const selectInvitesResData = createSelector(
  selectInvitesRes,
  (res) => res?.data || []
);

export const selectInvitesResDataCount = createSelector(
  selectInvitesResData,
  (data) => data.length
);

export const selectLoadInvitesError = createSelector(
  selectState,
  (state) => state.loadInvitesError
);

export const selectInvitesQuery = createSelector(
  selectState,
  (state) => state.invitesQuery
);

export const selectInvitesPage = createSelector(
  selectInvitesQuery,
  (query) => query?.page || 0
);

export const selectDisableNextInvites = createSelector(
  selectInvitesRes,
  selectInvitesQuery,
  (res, query) => {
    return !res?.totalPages || res?.totalPages - 1 === query?.page;
  }
);

export const selectDisablePreviousInvites = createSelector(
  selectInvitesPage,
  (page) => {
    const nextPage = page - 1;
    return nextPage < 0;
  }
);

export const selectPaginatedInvitesCount = createSelector(
  selectInvitesRes,
  (invites) => invites?.totalAmount || 0
);

export const selectDisplayEmptyMessage = createSelector(
  selectInvitesResData,
  selectLoadingInvites,
  (invites, loading) => invites.length === 0 && !loading
);

export const selectCreatingInvite = createSelector(
  selectState,
  (state) => state.creatingInvite
);

export const selectCreateInviteError = createSelector(
  selectState,
  (state) => state.createInviteError
);

export const selectPatchingInvite = createSelector(
  selectState,
  (state) => state.patchingInvite
);

export const selectPatchingInviteId = createSelector(
  selectState,
  (state) => state.patchingInviteId
);

export const selectPatchInviteError = createSelector(
  selectState,
  (state) => state.patchInviteError
);

export const selectResendingInvite = createSelector(
  selectState,
  (state) => state.resendingInvite
);

export const selectResendInviteError = createSelector(
  selectState,
  (state) => state.resendInviteError
);

export const selectResendingInviteId = createSelector(
  selectState,
  (state) => state.resendingInviteId
);


