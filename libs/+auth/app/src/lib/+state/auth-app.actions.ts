import { createAction, props } from '@ngrx/store';
import { ErrorResponseDto } from '@demo/shared/utils';

export enum AuthAppAction {
  SET_TOKEN = '[auth-app] Set API token',
  LOGOUT = '[auth-app] Logout from app',

  OPEN_STRIPE_CUSTOMER_PORTAL = '[auth-app] Open Stripe customer portal',
  OPEN_STRIPE_CUSTOMER_PORTAL_SUCCESS = '[auth-app] Opened Stripe customer portal',
  OPEN_STRIPE_CUSTOMER_PORTAL_FAILURE = '[auth-app] Failed to open Stripe customer portal',
}

export const setToken = createAction(
  AuthAppAction.SET_TOKEN,
  props<{ token: string }>()
);

export const logout = createAction(AuthAppAction.LOGOUT);

export const openStripePortal = createAction(
  AuthAppAction.OPEN_STRIPE_CUSTOMER_PORTAL
);

export const openStripePortalSuccess = createAction(
  AuthAppAction.OPEN_STRIPE_CUSTOMER_PORTAL_SUCCESS,
  props<{ url: string }>()
);

export const openStripePortalFailure = createAction(
  AuthAppAction.OPEN_STRIPE_CUSTOMER_PORTAL_FAILURE,
  props<{ error: ErrorResponseDto }>()
);
