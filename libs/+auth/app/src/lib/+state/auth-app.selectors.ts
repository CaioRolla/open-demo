import { createFeatureSelector, createSelector } from '@ngrx/store';

import { User } from '@demo/+auth/core';
import { AuthAppState, FEATURE_KEY } from './auth-app.reducer';

export const selectState = createFeatureSelector<AuthAppState>(FEATURE_KEY);

export const selectToken = createSelector(selectState, (state) => state.token);

export const selectUser = createSelector(selectState, (state) =>
  state.token
    ? (JSON.parse(atob(state.token.split('.')[1])) as unknown as User)
    : null
);

export const selectAccount = createSelector(selectUser, (user) => user?.account);

export const selectApiKey = createSelector(selectUser, (user) => user?.apiKey);

export const selectWelcomeMessage = createSelector(selectUser, (user) => {
  const messages = [
    { hour: 21, message: $localize`Working late`, emoji: '💪' },
    { hour: 19, message: $localize`Good evening`, emoji: '🌙' },
    { hour: 16, message: $localize`Good afternon`, emoji: '😎' },
    { hour: 6, message: $localize`Good morning`, emoji: '🌞' },
    { hour: 0, message: $localize`Hi`, emoji: '🦉' },
  ].reverse();

  const hour = new Date().getHours();

  const message = messages.find((m, index) => {
    const nextMessage = messages[index + 1];

    return m.hour <= hour && (!nextMessage || nextMessage.hour >= hour);
  });

  const capitalize = (s: string) => {
    return s[0].toUpperCase() + s.slice(1);
  };

  const name = (user?.displayName || user?.givenName)?.split(' ')[0];

  if (!name) {
    return `${message?.message} ${message?.emoji}`;
  }

  // return `${message?.message}, ${capitalize(name as string)} ${message?.emoji}`;
  return `Welcome, ${capitalize(name as string)}! ${message?.emoji}`;
});
