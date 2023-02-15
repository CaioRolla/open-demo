import { Account } from "@demo/+auth/core";

export class AccountUpgradedEvent {
  public static event = 'account.upgraded';
  constructor(public account: Account) {}
}
