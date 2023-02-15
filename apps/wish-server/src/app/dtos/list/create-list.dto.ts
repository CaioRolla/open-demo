import { CreateListDto as ICreateListDto } from '@demo/wish-shared/core';
import { IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateListDto implements ICreateListDto {
  @MaxLength(255)
  @MinLength(1)
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  desc?: string | null;

  @IsOptional()
  @IsUUID(4)
  bannerId?: string | null;

  @IsOptional()
  @IsString()
  themeId?: string | null;
}
