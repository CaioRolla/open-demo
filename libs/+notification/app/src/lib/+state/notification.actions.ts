import { createAction, props } from '@ngrx/store';
import { Notification } from '@demo/+notification/core';
import { ErrorResponseDto } from '@demo/shared/utils';

export enum NotificationAction {
  RESET_STATE = '[+notification-app] Reset state',

  LOAD_NOTIFICATIONS_SUCCESS = '[+notification-app] Loaded notifications successfully',
  LOAD_NOTIFICATIONS_FAILURE = '[+notification-app] Failed to load notifications',

  VIEWED_NOTIFICATIONS = '[+notification-app] Viewed notifications successfully',
  VIEWED_NOTIFICATIONS_SUCCESS = '[+notification-app] Loaded view successfully',
  VIEWED_NOTIFICATIONS_FAILURE = '[+notification-app] Failed to load view',
}

export const resetState = createAction(NotificationAction.RESET_STATE);

export const viewedNotifications = createAction(
  NotificationAction.VIEWED_NOTIFICATIONS
);

export const viewedNotificationsSuccess = createAction(
  NotificationAction.VIEWED_NOTIFICATIONS_SUCCESS
);

export const viewedNotificationsFailure = createAction(
  NotificationAction.VIEWED_NOTIFICATIONS_FAILURE,
  props<{ error: ErrorResponseDto }>()
);

export const loadNotificationsSuccess = createAction(
  NotificationAction.LOAD_NOTIFICATIONS_SUCCESS,
  props<{ notifications: Notification[] }>()
);

export const loadNotificationsFailure = createAction(
  NotificationAction.LOAD_NOTIFICATIONS_FAILURE,
  props<{ error: ErrorResponseDto }>()
);
