import { createReducer, on, Action } from '@ngrx/store';

import { Notification } from '@demo/+notification/core';
import * as NotificationActions from './notification.actions';

export const FEATURE_KEY = 'notificationList';

export interface NotificationState {
  notifications: Notification[];
}

export const initialState: NotificationState = {
  notifications: [],
};

const featureReducer = createReducer(
  initialState,
  on(NotificationActions.loadNotificationsSuccess, (state, action) => ({
    ...state,
    notifications: action.notifications,
  })),
  on(NotificationActions.viewedNotifications, (state, action) => ({
    ...state,
    notifications: state.notifications.map((n) => {
      return { ...n, viewed: true };
    }),
  })),
  on(NotificationActions.resetState, (state, action) => ({
    ...initialState,
  }))
);

export function reducer(state: NotificationState | undefined, action: Action) {
  return featureReducer(state, action);
}
