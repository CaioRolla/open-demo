import Stripe from "stripe";

export class CustomerSubscriptionDeletedEvent {
  public static event = 'stripe.customer.subscription.deleted';
  constructor(public payload: Stripe.Event) {}
}
