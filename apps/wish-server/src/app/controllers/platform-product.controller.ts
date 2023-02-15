import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User } from '@demo/+auth/core';
import { JwtAuthGuard, UseUser } from '@demo/+auth/server';
import { GetAllQueryDto } from '@demo/shared-server/utils/dto';
import { PlatformProductService } from '../services/platform-product.service';

@Controller({
  version: '1',
  path: 'platform-product',
})
export class PlatformProductController {
  constructor(private readonly _platformProductService: PlatformProductService) {}
  
  @Get('all')
  @UseGuards(JwtAuthGuard)
  public async getAll(@Query() query: GetAllQueryDto, @UseUser() user: User) {
    return this._platformProductService.getAll(query, user);
  }
}
