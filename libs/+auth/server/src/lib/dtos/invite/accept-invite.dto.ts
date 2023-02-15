import { IsUUID } from 'class-validator';

import { AcceptInviteDto as IAcceptInviteDto } from '@demo/+auth/core';

export class AcceptInviteDto implements IAcceptInviteDto {
  @IsUUID(4)
  id: string;
}
