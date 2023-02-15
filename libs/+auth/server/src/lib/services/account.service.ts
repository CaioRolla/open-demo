import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Optional,
} from '@nestjs/common';
import * as _ from 'lodash';

import { AccountStatus, AccountUpgradeQueryDto, User } from '@demo/+auth/core';
import { Stripe } from '@demo/shared-server/stripe';
import { AccountRepository } from '../repositories/account.repository';
import { AuthServerConfig } from '../auth-server.config';

@Injectable()
export class AccountService {
  constructor(
    private readonly _accountRepository: AccountRepository,
    private readonly _config: AuthServerConfig,
    @Optional() private readonly _stripe: Stripe
  ) {}

  public async upgrade(data: AccountUpgradeQueryDto): Promise<string> {
    if (!this._config.account) {
      throw new InternalServerErrorException(['Plan feature not configured.']);
    }

    const account = await this._accountRepository.findOne({
      where: { id: data.accountId },
    });

    if (!account) {
      throw new NotFoundException(['Account not found.']);
    }

    const session = await this._stripe.client.checkout.sessions.create({
      payment_method_types: ['card'],

      ...(data.coupon
        ? {
            discounts: [
              {
                coupon: data.coupon,
              },
            ],
          }
        : {}),

      metadata: {
        accountId: data.accountId,
        plan: data.plan,
        planType: data.planType,
      },
      line_items: [
        {
          quantity: 1,
          price: this._config.account.planIdMapper(data.plan, data.planType),
        },
      ],

      mode: 'subscription',
      success_url: `${this._config.appBasePath}`,
      cancel_url: `${this._config.appBasePath}`,
    });

    return session.url;
  }

  public async getStripeCustomerPortalURL(
    user: User
  ): Promise<{ url: string }> {
    if (!this._config.account) {
      throw new InternalServerErrorException(['Plan feature not configured.']);
    }

    const { account } = user;

    if (!account.stripeCustomerId) {
      throw new NotFoundException(['Account customer ID not found.']);
    }

    const session = await this._stripe.client.billingPortal.sessions.create({
      customer: account.stripeCustomerId,
      return_url: `${this._config.appBasePath}`,
    });

    return { url: session.url };
  }
}
