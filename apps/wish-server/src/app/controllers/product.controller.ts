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
import { ClonePlatformProductDto } from '../dtos/product/clone-platform-product.dto';
import { CreateProductDto } from '../dtos/product/create-product.dto';
import { GetAllProductQueryDto } from '../dtos/product/get-all-product-query.dto';
import { PatchProductDto } from '../dtos/product/patch-product.dto';
import { SelectProductDto } from '../dtos/product/select-product.dto';
import { UnselectProductDto } from '../dtos/product/unselect-product.dto';
import { ProductService } from '../services/product.service';

@Controller({
  version: '1',
  path: 'product',
})
export class ProductController {
  constructor(private readonly _productService: ProductService) {}

  @Post('clone-platform-product')
  @UseGuards(JwtAuthGuard)
  public async clonePlatformProduct(
    @Body() body: ClonePlatformProductDto,
    @UseUser() user: User
  ) {
    return this._productService.clonePlatformProduct(body, user);
  }

  @Post('select')
  public async select(@Body() selectDto: SelectProductDto) {
    return this._productService.select(selectDto);
  }

  @Post('unselect')
  public async unselect(@Body() unselectDto: UnselectProductDto) {
    return this._productService.unselect(unselectDto);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  public async getAll(
    @Query() query: GetAllProductQueryDto,
    @UseUser() user: User
  ) {
    return this._productService.getAll(query, user);
  }

  @Get(':productId')
  @UseGuards(JwtAuthGuard)
  public async get(
    @Param('productId') productId: string,
    @UseUser() user: User
  ) {
    return this._productService.get(productId, user);
  }

  @Delete(':productId')
  @UseGuards(JwtAuthGuard)
  public async delete(
    @Param('productId') productId: string,
    @UseUser() user: User
  ) {
    return this._productService.delete(productId, user);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  public async create(@Body() body: CreateProductDto, @UseUser() user: User) {
    return this._productService.create(body, user);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  public async patch(@Body() body: PatchProductDto, @UseUser() user: User) {
    return this._productService.patch(body, user);
  }
}
