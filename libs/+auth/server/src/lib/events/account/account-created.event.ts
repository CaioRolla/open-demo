import { Account } from '@demo/+auth/core';

export class AccountCreatedEvent {
  public static event = 'account.created';
  constructor(public account: Account) {}
}
