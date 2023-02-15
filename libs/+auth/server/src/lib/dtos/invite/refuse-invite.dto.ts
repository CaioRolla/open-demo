import { IsUUID } from 'class-validator';

import { RefuseInviteDto as IRefuseInviteDto } from '@demo/+auth/core';

export class RefuseInviteDto implements IRefuseInviteDto {
  @IsUUID(4)
  id: string;
}
