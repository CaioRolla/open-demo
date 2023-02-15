import { ResendInviteDto as IResendInviteDto } from '@demo/+auth/core';
import { IsUUID } from 'class-validator';

export class ResendInviteDto implements IResendInviteDto {
  @IsUUID(4)
  id: string;
}
