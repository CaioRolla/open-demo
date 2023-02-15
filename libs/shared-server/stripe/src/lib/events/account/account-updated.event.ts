import Stripe from "stripe";

export class StripeAccountUpdatedEvent {
  public static event = 'stripe.account.created';
  constructor(public payload: Stripe.Event) {}
}
