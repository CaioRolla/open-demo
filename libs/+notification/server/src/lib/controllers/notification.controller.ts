import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { User } from '@demo/+auth/core';
import { JwtAuthGuard, UseUser } from '@demo/+auth/server';

import { NotificationService } from '../services/notification.service';

@Controller({
  path: 'notification',
  version: '1',
})
export class NotificationController {
  constructor(private readonly _notificationService: NotificationService) {}

  @Patch('mark-as-viewed')
  @UseGuards(JwtAuthGuard)
  public async markAsViewed(@UseUser() user: User) {
    return this._notificationService.markAsViewed(user);
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  public async get(@UseUser() user: User) {
    return this._notificationService.getMy(user);
  }


}
