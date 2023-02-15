import { IsOptional} from 'class-validator';
import { Type } from 'class-transformer';

import { GetAllQueryDto as IGetAllQueryDto } from '@demo/shared/utils';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetAllQueryDto implements IGetAllQueryDto {

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  take?:number = 5;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  page?:number = 0;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => String)
  q?: string;

}
