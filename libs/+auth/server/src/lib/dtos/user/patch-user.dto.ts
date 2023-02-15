import { UserStatus, PatchUserDto as IPatchUserDto, UserPermission } from '@demo/+auth/core';
import { IsArray, IsEnum, IsIn, IsNotIn, IsOptional, IsString, IsUUID } from 'class-validator';

export class PatchUserDto implements IPatchUserDto {
  @IsUUID(4)
  id: string;

  @IsOptional()
  @IsEnum(UserStatus)
  @IsIn([UserStatus.DISABLED, UserStatus.ACTIVE])
  status?: UserStatus;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  permissions?: UserPermission[];
}

