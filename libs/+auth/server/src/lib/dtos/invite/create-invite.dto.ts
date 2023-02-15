import { CreateInviteDto as ICreateInviteDto, UserPermission } from '@demo/+auth/core';
import { IsArray, IsEmail, IsString } from 'class-validator';

export class CreateInviteDto implements ICreateInviteDto {
    
    @IsEmail()
    email: string;

    @IsArray()
    @IsString({ each: true })
    permissions: UserPermission[];
}