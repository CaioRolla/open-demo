import {
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PatchProductDto as IPatchProductDto } from '@demo/wish-shared/core';

export class PatchProductDto implements IPatchProductDto {
  @IsUUID(4)
  id: string;

  @IsOptional()
  @MaxLength(255)
  @MinLength(1)
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  desc?: string | null;

  @IsOptional()
  @IsUrl()
  url?: string | null;

  @IsOptional()
  @IsNumber()
  estimatedPrice: number | null;

  @IsOptional()
  @IsUUID(4, { each: true })
  imagesIds?: string[] | null;

  @IsOptional()
  @IsUUID(4)
  personId?: string | null;
}
