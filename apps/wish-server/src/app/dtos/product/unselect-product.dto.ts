import { UnselectProductDto as IUnselectProductDto } from '@demo/wish-shared/core';
import {
  IsEmail,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UnselectProductDto implements IUnselectProductDto {
  @IsEmail()
  personEmail: string;

  @IsUUID(4)
  productId: string;
}
