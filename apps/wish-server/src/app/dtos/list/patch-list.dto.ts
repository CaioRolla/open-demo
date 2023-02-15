import { PatchListDto as IPatchListDto } from '@demo/wish-shared/core';
import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class PatchListDto implements IPatchListDto {
    @IsUUID(4)
    id: string;

    @IsOptional()
    @MaxLength(255)
    @MinLength(1)
    @IsString()
    name?: string;
  
    @IsOptional()
    @IsString()
    @MaxLength(500)
    desc?: string | null;
  
    @IsOptional()
    @IsUUID(4)
    bannerId?: string | null;

    @IsOptional()
    @IsUUID(4, { each: true })
    profileIds?: string[] | null;
  
    @IsOptional()
    @IsString()
    themeId?: string | null;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    eventDate?: Date | null;

    @IsOptional()
    @MaxLength(255)
    @MinLength(1)
    @IsString()
    pix?: string | null;

    @IsOptional()
    @IsString()
    @MaxLength(300)
    eventLocation?: string | null;
} 