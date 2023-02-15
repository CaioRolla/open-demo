import { Body, Controller, Get, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

import { User } from '@demo/+auth/core';
import { GetAllQueryDto } from '@demo/shared-server/utils/dto';
import { UseUser } from '../decorators/use-user.decorator';
import { PatchUserDto } from '../dtos/user/patch-user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserService } from '../services/user.service';

@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get('all')
  @UseGuards(JwtAuthGuard)
  @ApiExcludeEndpoint()
  public async getAll(@Query() query: GetAllQueryDto, @UseUser() user: User) {
    return this._userService.getAll(query, user);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @ApiExcludeEndpoint()
  public async patch(@Body() body: PatchUserDto, @UseUser() user: User) {
    return this._userService.patch(body, user);
  }
}
