import { createAction, props } from '@ngrx/store';
import { ForgotPasswordDto } from '@demo/+auth/core';
import { ErrorResponseDto } from '@demo/shared/utils';

export enum ForgotPasswordAction {
  RESEND_CONFIRMATION = '[forgot-password] Resend confirmation email',
  RESEND_CONFIRMATION_FAILURE = '[forgot-password] Faild resend confirmation email',
  RESEND_CONFIRMATION_SUCCESS = '[forgot-password] Resend confirmation email success',
}

export const resendConfirmation = createAction(
  ForgotPasswordAction.RESEND_CONFIRMATION,
  props<{ dto: ForgotPasswordDto }>()
);

export const resendConfirmationFailure = createAction(
  ForgotPasswordAction.RESEND_CONFIRMATION_FAILURE,
  props<{ error: ErrorResponseDto }>()
);

export const resendConfirmationSuccess = createAction(
  ForgotPasswordAction.RESEND_CONFIRMATION_SUCCESS,
  props<{ email: string }>()
);
