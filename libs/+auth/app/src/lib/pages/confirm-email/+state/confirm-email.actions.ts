import { createAction, props } from '@ngrx/store';
import { ResendRegisterConfirmationDto } from '@demo/+auth/core';
import { ErrorResponseDto } from '@demo/shared/utils';

export enum ConfirmEmailAction {
  RESEND_CONFIRMATION = '[resendConfirmation] Resend confirmation email',
  RESEND_CONFIRMATION_FAILURE = '[resendConfirmation] Faild resend confirmation email',
  RESEND_CONFIRMATION_SUCCESS = '[resendConfirmation] Resend confirmation email success',
}

export const resendConfirmation = createAction(
  ConfirmEmailAction.RESEND_CONFIRMATION,
  props<{ dto: ResendRegisterConfirmationDto }>()
);

export const resendConfirmationFailure = createAction(
  ConfirmEmailAction.RESEND_CONFIRMATION_FAILURE,
  props<{ error: ErrorResponseDto }>()
);

export const resendConfirmationSuccess = createAction(
  ConfirmEmailAction.RESEND_CONFIRMATION_SUCCESS
);
