import Stripe from "stripe";

export class CheckoutSessionCompletedEvent {
  public static event = 'stripe.checkout.session.completed';
  constructor(public payload: Stripe.Event) {}
}
