import { Invite, InviteStatus } from '../../entities/invite.entity';
import { UserPermission } from '../../entities/user.entity';

export interface GetAllInviteDto {
  id: string;

  email: string;

  permissions: UserPermission[];

  status: InviteStatus;

  createdAt: Date;
}

export const getAllInviteFromInvite = (invite: Invite): GetAllInviteDto => {
  return {
    id: invite.id,
    email: invite.email,
    permissions: invite.permissions,
    status: invite.status,
    createdAt: invite.createdAt,
  };
};

export const getAllInviteListFromInviteList = (
  invites: Invite[]
): GetAllInviteDto[] => {
  return invites.map((sch) => getAllInviteFromInvite(sch));
};
