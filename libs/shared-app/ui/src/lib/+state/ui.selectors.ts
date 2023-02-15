import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UiState, UI_FEATURE_KEY } from './ui.reducer';

export const getUiState = createFeatureSelector<UiState>(UI_FEATURE_KEY);

export const getSidebarIsOpen = createSelector(
  getUiState,
  state => state.sidebarIsOpen
);

