import Stripe from "stripe";

export class SubscriptionUpdatedEvent {
  public static event = 'stripe.subscription.updated';
  constructor(public payload: Stripe.Event) {}
}
