import { InviteStatus } from '../../entities/invite.entity';
import { UserPermission } from '../../entities/user.entity';

export interface PatchInviteDto {
  id: string;
  
  status?: InviteStatus;

  permissions?: UserPermission[];
}
