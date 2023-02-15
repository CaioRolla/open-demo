import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as UiActions from './ui.actions';

export const UI_FEATURE_KEY = 'ui';

export interface UiState {
  // Sidebar
  sidebarIsOpen: boolean;
}

export const initialState = {
  sidebarIsOpen: false,
  // sidebarIsOpen: false,
};

const uiReducer = createReducer(
  initialState,
  on(UiActions.openSidebar, (state) => ({ ...state, sidebarIsOpen: true })),
  on(UiActions.closeSidebar, (state) => ({ ...state, sidebarIsOpen: false })),
  on(UiActions.toggleSidebar, (state) => ({ ...state, sidebarIsOpen: !state.sidebarIsOpen })),
);

export function reducer(state: UiState | undefined, action: Action) {
  return uiReducer(state, action);
}
