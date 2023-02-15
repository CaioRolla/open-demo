import Stripe from "stripe";

export class CheckoutSessionAsyncPaymentSucceededEvent {
  public static event = 'stripe.checkout.session.async-payment-succeeded';
  constructor(public payload: Stripe.Event) {}
}
