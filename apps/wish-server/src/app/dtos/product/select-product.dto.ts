import { SelectProductDto as ISelectProductDto } from '@demo/wish-shared/core';
import {
  IsEmail,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SelectProductDto implements ISelectProductDto {
  @IsEmail()
  personEmail: string;

  @MaxLength(255)
  @MinLength(1)
  @IsString()
  personName: string;

  @IsUUID(4)
  productId: string;
}
