import { createAction, props } from '@ngrx/store';
import { JwtTokenDto, RegisterDto } from '@demo/+auth/core';
import { ErrorResponseDto } from '@demo/shared/utils';

export enum RegisterAction {
  REGISTER = '[register] Perform register with email and password',
  REGISTER_FAILURE = '[register] Faild to Perform register with email and password',
  REGISTER_SUCCESS = '[register] Register with email and password success',
}

export const register = createAction(
  RegisterAction.REGISTER,
  props<{ dto: RegisterDto }>()
);

export const registerFailure = createAction(
  RegisterAction.REGISTER_FAILURE,
  props<{ error: ErrorResponseDto }>()
);

export const registerSuccess = createAction(
  RegisterAction.REGISTER_SUCCESS,
  props<{ email: string }>()
);
