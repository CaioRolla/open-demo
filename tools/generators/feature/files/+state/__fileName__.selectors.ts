import { createFeatureSelector, createSelector } from '@ngrx/store';

import { <%= className %>State, FEATURE_KEY } from './<%= fileName %>.reducer';

export const selectState = createFeatureSelector<<%= className %>State>(FEATURE_KEY);

