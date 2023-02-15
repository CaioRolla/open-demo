import Stripe from "stripe";

export class InvoicePaidEvent {
  public static event = 'stripe.invoice.paid';
  constructor(public payload: Stripe.Event) {}
}
