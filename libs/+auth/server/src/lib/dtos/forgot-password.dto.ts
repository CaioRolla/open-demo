import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { ForgotPasswordDto as IForgotPasswordDto } from '@demo/+auth/core';

export class ForgotPasswordDto
  implements IForgotPasswordDto
{
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
