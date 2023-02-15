import { createAction, props } from '@ngrx/store';
import { ForgotPasswordDto } from '@demo/+auth/core';
import { ErrorResponseDto } from '@demo/shared/utils';

export enum ForgotPasswordEmailAction {
  RESEND_CONFIRMATION = '[forgot-password-email] Resend confirmation email',
  RESEND_CONFIRMATION_FAILURE = '[forgot-password-email] Faild resend confirmation email',
  RESEND_CONFIRMATION_SUCCESS = '[forgot-password-email] Resend confirmation email success',
}

export const resendConfirmation = createAction(
  ForgotPasswordEmailAction.RESEND_CONFIRMATION,
  props<{ dto: ForgotPasswordDto }>()
);

export const resendConfirmationFailure = createAction(
  ForgotPasswordEmailAction.RESEND_CONFIRMATION_FAILURE,
  props<{ error: ErrorResponseDto }>()
);

export const resendConfirmationSuccess = createAction(
  ForgotPasswordEmailAction.RESEND_CONFIRMATION_SUCCESS
);
