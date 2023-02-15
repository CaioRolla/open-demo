import { createFeatureSelector, createSelector } from '@ngrx/store';

import { FEATURE_KEY, NotificationState } from './notification.reducer';

export const selectState = createFeatureSelector<NotificationState>(FEATURE_KEY);

export const selectNotifications = createSelector(selectState, state => state.notifications);

export const selectNotificationsCount = createSelector(selectNotifications, notifications => notifications.length);

export const selectUnviewedNotifications = createSelector(selectNotifications, notifications => notifications.filter(n => !n.viewed));

export const selectUnviewedNotificationsCount = createSelector(selectUnviewedNotifications, notifications => notifications.length);

