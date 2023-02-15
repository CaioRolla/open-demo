import { ClonePlatformProductDto as IClonePlatformProductDto } from '@demo/wish-shared/core';

import { IsUUID } from 'class-validator';


export class ClonePlatformProductDto implements IClonePlatformProductDto {
  @IsUUID(4)
  listId: string;

  @IsUUID(4, { each: true })
  platformProductIds: string[];
}
