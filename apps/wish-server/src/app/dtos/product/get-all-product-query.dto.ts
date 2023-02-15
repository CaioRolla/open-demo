import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { GetAllQueryDto } from '@demo/shared-server/utils/dto';
import { GetAllProductQueryDto as IGetAllProductQueryDto } from '@demo/wish-shared/core';

export class GetAllProductQueryDto extends GetAllQueryDto implements IGetAllProductQueryDto  {
 
    @IsOptional()
    @Type(() => String)
    listId: string | null;
}