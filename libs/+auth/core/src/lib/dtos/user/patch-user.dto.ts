import { UserPermission, UserStatus } from "../../entities/user.entity";

export interface PatchUserDto {
  id: string;
  
  status?: UserStatus;

  permissions?: UserPermission[];
}
