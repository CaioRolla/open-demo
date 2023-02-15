import {
  Body,
  Controller,
  Post,
  Headers,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

import { Logger } from '@demo/shared-server/logging';
import {
  CustomerSubscriptionDeletedEvent,
  InvoicePaidEvent,
  SubscriptionUpdatedEvent,
} from '@demo/shared-server/stripe';
import { StripeAccountUpdatedEvent } from '../../events/account/account-updated.event';
import { CheckoutSessionAsyncPaymentSucceededEvent } from '../../events/checkout/checkout-session-async-payment-succeeded.event';
import { CheckoutSessionCompletedEvent } from '../../events/checkout/checkout-session-completed.event';
import { Stripe } from '../../services/stripe.service';
import { SharedServerStripeConfig } from '../../shared-server-stripe.config';

@Controller({
  path: 'stripe-hook',
  version: '1',
})
export class StripeHookController {
  constructor(
    private readonly _stripe: Stripe,
    private readonly _eventEmitter: EventEmitter2,
    private readonly _config: SharedServerStripeConfig,
    private readonly _logger: Logger
  ) {}

  @Post('connect')
  @ApiExcludeEndpoint()
  public async connectedhooks(
    @Req() request: any,
    @Headers('stripe-signature') signature
  ) {
    try {
      const event = this._stripe.client.webhooks.constructEvent(
        request.rawBody,
        signature,
        this._config.connectEndpointSecret
      );

      this._handleEvents(event);
    } catch (err) {
      this._logger.error(`hooks`, err);
      throw new BadRequestException();
    }

    return;
  }
  @Post()
  @ApiExcludeEndpoint()
  public async hooks(
    @Req() request: any,
    @Headers('stripe-signature') signature
  ) {
    try {
      const event = this._stripe.client.webhooks.constructEvent(
        request.rawBody,
        signature,
        this._config.endpointSecret
      );

      this._handleEvents(event);
    } catch (err) {
      this._logger.error(`hooks`, err);
      throw new BadRequestException();
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return;
  }

  private _handleEvents(event) {
    switch (event.type) {
      case 'checkout.session.completed':
        this._eventEmitter.emit(
          CheckoutSessionCompletedEvent.event,
          new CheckoutSessionCompletedEvent(event)
        );
        break;
      case 'account.updated':
        this._eventEmitter.emit(
          StripeAccountUpdatedEvent.event,
          new StripeAccountUpdatedEvent(event)
        );
        break;
      case 'customer.subscription.deleted':
        this._eventEmitter.emit(
          CustomerSubscriptionDeletedEvent.event,
          new CustomerSubscriptionDeletedEvent(event)
        );
        break;
      case 'invoice.paid':
        this._eventEmitter.emit(
          InvoicePaidEvent.event,
          new InvoicePaidEvent(event)
        );
        break;
      case 'customer.subscription.updated':
        this._eventEmitter.emit(
          SubscriptionUpdatedEvent.event,
          new SubscriptionUpdatedEvent(event)
        );
        break;
      case 'checkout.session.async_payment_succeeded':
        this._eventEmitter.emit(
          CheckoutSessionAsyncPaymentSucceededEvent.event,
          new CheckoutSessionAsyncPaymentSucceededEvent(event)
        );
        break;
      default:
        break;
    }
  }
}
