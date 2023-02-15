import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { ResetPasswordDto as IResetPasswordDto } from '@demo/+auth/core';

export class ResetPasswordDto
  implements IResetPasswordDto
{

  @IsUUID(4)
  @IsNotEmpty()
  confirmationToken: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
