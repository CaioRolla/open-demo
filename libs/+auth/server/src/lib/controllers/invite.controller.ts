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
import { ApiExcludeEndpoint } from '@nestjs/swagger';

import { User } from '@demo/+auth/core';
import { GetAllQueryDto } from '@demo/shared-server/utils/dto';
import { UseUser } from '../decorators/use-user.decorator';
import { AcceptInviteDto } from '../dtos/invite/accept-invite.dto';
import { CreateInviteDto } from '../dtos/invite/create-invite.dto';
import { PatchInviteDto } from '../dtos/invite/patch-invite.dto';
import { RefuseInviteDto } from '../dtos/invite/refuse-invite.dto';
import { ResendInviteDto } from '../dtos/invite/resend-invite.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { InviteService } from '../services/invite.service';

@Controller({
  path: 'invite',
  version: '1',
})
export class InviteController {
  constructor(private readonly _inviteService: InviteService) {}

  @Get('all')
  @UseGuards(JwtAuthGuard)
  @ApiExcludeEndpoint()
  public async getAll(@Query() query: GetAllQueryDto, @UseUser() user: User) {
    return this._inviteService.getAll(query, user);
  }

  // @Post('refuse')
  // @UseGuards(JwtAuthGuard)
  // @ApiExcludeEndpoint()
  // public async refuse(@Body() body: RefuseInviteDto, @UseUser() user: User) {
  //   return this._inviteService.refuse(body, user);
  // }

  // @Post('accept')
  // @UseGuards(JwtAuthGuard)
  // @ApiExcludeEndpoint()
  // public async accept(@Body() body: AcceptInviteDto, @UseUser() user: User) {
  //   return this._inviteService.accept(body, user);
  // }

  @Post('resend')
  @UseGuards(JwtAuthGuard)
  @ApiExcludeEndpoint()
  public async resend(@Body() body: ResendInviteDto, @UseUser() user: User) {
    return this._inviteService.resend(body, user);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiExcludeEndpoint()
  public async create(@Body() body: CreateInviteDto, @UseUser() user: User) {
    return this._inviteService.create(body, user);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @ApiExcludeEndpoint()
  public async patch(@Body() body: PatchInviteDto, @UseUser() user: User) {
    return this._inviteService.patch(body, user);
  }

  @Get(':inviteId')
  @UseGuards(JwtAuthGuard)
  @ApiExcludeEndpoint()
  public async get(@Param('inviteId') inviteId: string, @UseUser() user: User) {
    return this._inviteService.get(inviteId, user);
  }

  @Delete(':inviteId')
  @UseGuards(JwtAuthGuard)
  @ApiExcludeEndpoint()
  public async delete(
    @Param('inviteId') inviteId: string,
    @UseUser() user: User
  ) {
    return this._inviteService.delete(inviteId, user);
  }
}
