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
import { GetAllQueryDto } from '@demo/shared-server/utils/dto';
import { CreateListDto } from '../dtos/list/create-list.dto';
import { PatchListDto } from '../dtos/list/patch-list.dto';
import { ListService } from '../services/list.service';

@Controller({
  version: '1',
  path: 'list',
})
export class ListController {
  constructor(private readonly _listService: ListService) {}

  @Post('notify')
  public async notify() {
    return this._listService.notify();
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  public async getAll(@Query() query: GetAllQueryDto, @UseUser() user: User) {
    return this._listService.getAll(query, user);
  }

  @Get(':listId/public')
  public async public(@Param('listId') listId: string) {
    return this._listService.public(listId);
  }

  @Get(':listId')
  @UseGuards(JwtAuthGuard)
  public async get(@Param('listId') listId: string, @UseUser() user: User) {
    return this._listService.get(listId, user);
  }

  @Delete(':listId')
  @UseGuards(JwtAuthGuard)
  public async delete(@Param('listId') listId: string, @UseUser() user: User) {
    return this._listService.delete(listId, user);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  public async create(@Body() body: CreateListDto, @UseUser() user: User) {
    return this._listService.create(body, user);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  public async patch(@Body() body: PatchListDto, @UseUser() user: User) {
    return this._listService.patch(body, user);
  }
}
