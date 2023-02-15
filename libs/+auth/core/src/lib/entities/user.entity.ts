import { Asset } from '@demo/+asset/core';
import { Account } from "./account.entity";

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  DISABLED = 'DISABLED',
  PENDING_CONFIRMATION = 'PENDING_CONFIRMATION',
}

export enum UserBasicPermission {
  TEAM_VIEW = 'TEAM:VIEW',
  TEAM_CREATE_INVITE = 'TEAM:CREATE_INVITE',
  TEAM_PATCH_INVITE = 'TEAM:PATCH_INVITE',
  TEAM_PATCH_USER = 'TEAM:PATCH_USER',

  PLAN_MANAGE_SUBSCRIPTION = 'PLAN:MANAGE_SUBSCRIPTION',
  API_VIEW_KEY = 'API:VIEW_KEY',
}

export type UserPermission = UserBasicPermission | string;

export interface User {
  id: string;

  account: Account;

  accountOwner: boolean;

  apiKey: string;

  confirmationToken: string | null;

  email?: string;

  displayName: string;

  status: UserStatus;

  permissions: UserPermission[];

  password?: string;

  accessToken?: string;

  refreshToken?: string;

  profilePicUrl?: string;

  profile: Asset | null;

  givenName?: string;

  familyName?: string;

  admin: boolean;

  createdAt: Date;

  updatedAt: Date | null;

  deletedAt: Date | null;
}
