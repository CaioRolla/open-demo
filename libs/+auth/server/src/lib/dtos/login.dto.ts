import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { LoginDto as ILoginDto } from '@demo/+auth/core'

export class LoginDto implements ILoginDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}
