import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

import { RegisterDto as IRegisterDto } from '@demo/+auth/core'

export class RegisterDto implements IRegisterDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsUUID(4)
    @IsOptional()
    inviteId?: string;
}
