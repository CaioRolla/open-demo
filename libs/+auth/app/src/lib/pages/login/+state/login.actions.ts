import { createAction, props } from '@ngrx/store';
import { JwtTokenDto, LoginDto } from '@demo/+auth/core';
import { ErrorResponseDto } from '@demo/shared/utils';

export enum LoginAction {
  LOGIN = '[login] Perform login with email and password',
  LOGIN_FAILURE = '[login] Faild to Perform login with email and password',
  LOGIN_SUCCESS = '[login] Login with email and password success',
}

export const login = createAction(
  LoginAction.LOGIN,
  props<{ dto: LoginDto }>()
);

export const loginFailure = createAction(
  LoginAction.LOGIN_FAILURE,
  props<{ error: ErrorResponseDto, email: string }>()
);

export const loginSuccess = createAction(
  LoginAction.LOGIN_SUCCESS,
  props<{ res: JwtTokenDto }>()
);
