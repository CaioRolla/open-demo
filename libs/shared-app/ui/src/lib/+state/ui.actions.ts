import { createAction, props } from '@ngrx/store';

enum UiActions {
  OPEN_SIDEBAR = `[UI] Open Sidebar`,
  CLOSE_SIDEBAR = `[UI] Close Sidebar`,
  TOGGLE_SIDEBAR = `[UI] Toggle Sidebar`,

  SET_PAGE_TITLE = '[UI] Set page title',

}


export const openSidebar = createAction(UiActions.OPEN_SIDEBAR);

export const closeSidebar = createAction(UiActions.CLOSE_SIDEBAR);

export const toggleSidebar = createAction(UiActions.TOGGLE_SIDEBAR);

export const setPageTitle = createAction(
  UiActions.SET_PAGE_TITLE,
  props<{ title: string }>()
);
