import { User, UserPermission, UserStatus } from '@demo/+auth/core';

export interface GetAllUserDto {
  id: string;

  email?: string;

  displayName: string;

  status: UserStatus;

  accountOwner: boolean;

  permissions: UserPermission[];

  profilePicUrl?: string;

  givenName?: string;

  familyName?: string;

  createdAt: Date;
}

export const getAllUserFromUser = (user: User): GetAllUserDto => {
  return {
    id: user.id,
    email: user.email,
    displayName: user.displayName,
    accountOwner: user.accountOwner,
    permissions: user.permissions,
    profilePicUrl: user.profilePicUrl,
    givenName: user.givenName,
    familyName: user.familyName,
    status: user.status,
    createdAt: user.createdAt,
  };
};

export const getAllUserListFromUserList = (users: User[]): GetAllUserDto[] => {
  return users.map((sch) => getAllUserFromUser(sch));
};
