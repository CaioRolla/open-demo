import { CreatePersonDto as ICreatePersonDto } from '@demo/wish-shared/core';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePersonDto implements ICreatePersonDto {
    @MaxLength(255)
    @MinLength(1)
    @IsString()
    name: string;

    @MaxLength(255)
    @MinLength(1)
    @IsEmail()
    email: string;
} 