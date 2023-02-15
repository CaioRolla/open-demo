import { Injectable } from '@nestjs/common';
import SStripe from 'stripe';
// const stripe = require('stripe');

import { SharedServerStripeConfig } from '../shared-server-stripe.config';

@Injectable()
export class Stripe {

  public readonly client = new SStripe(this._config.secretKey, {
    apiVersion: '2020-08-27',
  });

  constructor(private readonly _config: SharedServerStripeConfig) {}

}
