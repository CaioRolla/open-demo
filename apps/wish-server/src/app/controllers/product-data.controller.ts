import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User } from '@demo/+auth/core';
import { JwtAuthGuard, UseUser } from '@demo/+auth/server';
import { ProductDataService } from '../services/product-data.service';

@Controller({
  version: '1',
  path: 'product-data',
})
export class ProductDataController {
  constructor(private readonly _productDataService: ProductDataService) {}

  @Get(':url')
  // @UseGuards(JwtAuthGuard)
  public async get(
    @Param('url') url: string,
    // @UseUser() user: User
  ) {
    return this._productDataService.get(url, { } as any);
  }
}
