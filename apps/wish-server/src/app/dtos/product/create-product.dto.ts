import { CreateProductDto as ICreateProductDto } from '@demo/wish-shared/core';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProductDto implements ICreateProductDto {
  @IsUUID(4)
  listId: string;

  @MaxLength(255)
  @MinLength(1)
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  desc: string | null;

  @IsOptional()
  @IsUrl()
  url: string | null;

  @IsOptional()
  @IsNumber()
  estimatedPrice: number | null;

  @IsOptional()
  @IsUUID(4, { each: true })
  imagesIds: string[] | null;
}
