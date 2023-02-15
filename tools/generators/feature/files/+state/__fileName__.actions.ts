import {  createAction, props } from '@ngrx/store';

export enum <%= className %>Action {
  RESET_STATE = '[<%= dirAndName %>] Reset state'
}



export const resetState = createAction(
  <%= className %>Action.RESET_STATE
);
