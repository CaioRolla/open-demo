import { Account } from "./account.entity";
import { UserPermission } from "./user.entity";

export enum InviteStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DENIED = 'DENIED',
  CANCELED = 'CANCELED',
}

export interface Invite {
  id: string;

  account: Account;

  email: string;

  status: InviteStatus;

  permissions: UserPermission[];

  createdAt: Date;

  updatedAt: Date | null;

  deletedAt: Date | null;
}
