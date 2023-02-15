import { createAction, props } from '@ngrx/store';
import { JwtTokenDto, ResetPasswordDto } from '@demo/+auth/core';
import { ErrorResponseDto } from '@demo/shared/utils';

export enum ResetPasswordAction {
  RESET = '[reset] Perform reset with email and password',
  RESET_FAILURE = '[reset] Faild to Perform reset with email and password',
  RESET_SUCCESS = '[reset] ResetPassword with email and password success',
}

export const reset = createAction(
  ResetPasswordAction.RESET,
  props<{ dto: ResetPasswordDto }>()
);

export const resetFailure = createAction(
  ResetPasswordAction.RESET_FAILURE,
  props<{ error: ErrorResponseDto }>()
);

export const resetSuccess = createAction(
  ResetPasswordAction.RESET_SUCCESS,
  props<{ res: JwtTokenDto }>()
);
