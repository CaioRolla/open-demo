import { Invite } from "./invite.entity";
import { User } from "./user.entity";

export enum AccountStatus {
  ACTIVE = 'ACTIVE',
}

export interface Account {
  id: string;

  users: User[];

  invites: Invite[];

  status: AccountStatus;

  plan: string;

  planType?: string;

  stripeSubscriptionId?: string;

  stripeCustomerId?: string;

  createdAt: Date;

  updatedAt: Date | null;

  deletedAt: Date | null;
}