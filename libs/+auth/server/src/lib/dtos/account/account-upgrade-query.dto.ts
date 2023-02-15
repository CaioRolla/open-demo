import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

import { AccountUpgradeQueryDto as IAccountUpgradeQueryDto } from '@demo/+auth/core';

export class AccountUpgradeQueryDto implements IAccountUpgradeQueryDto  {
    @IsUUID(4)
    accountId: string;
    
    @IsString()
    plan: string;

    @IsString()
    planType: string;

    @IsOptional()
    @IsString()
    coupon: string | null;

}