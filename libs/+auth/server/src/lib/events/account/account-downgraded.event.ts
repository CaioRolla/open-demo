import { Account } from "@demo/+auth/core";

export class AccountDowngradedEvent {
  public static event = 'account.downgraded';
  constructor(public account: Account) {}
}
