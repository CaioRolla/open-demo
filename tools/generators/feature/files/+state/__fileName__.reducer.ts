import { createReducer, on, Action } from '@ngrx/store';

import * as <%= className %>Actions from './<%= fileName %>.actions';

export const FEATURE_KEY = '<%= propertyName %>';

export interface <%= className %>State {

}

export const initialState: <%= className %>State = {

}

const featureReducer = createReducer(
  initialState,
  // on(<%= className %>Actions.action, (state, action) => ({
  //   ...state,
  //   deleteChannelLoading: true
  // })),
  on(<%= className %>Actions.resetState, (state, action) => ({
    ...initialState,
  })),
);

export function reducer(state: <%= className %>State | undefined, action: Action) {
  return featureReducer(state, action);
}
