import {
  InviteStatus,
  PatchInviteDto as IPatchInviteDto,
  UserPermission,
} from '@demo/+auth/core';
import { IsArray, IsEnum, IsIn, IsNotIn, IsOptional, IsString, IsUUID } from 'class-validator';

export class PatchInviteDto implements IPatchInviteDto {
  @IsUUID(4)
  id: string;

  @IsOptional()
  @IsEnum(InviteStatus)
  @IsIn([InviteStatus.CANCELED])
  status?: InviteStatus;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  permissions?: UserPermission[];
}
