import { UserPermission } from "../../entities/user.entity";

export interface CreateInviteDto {
    email: string;

    permissions: UserPermission[];
}