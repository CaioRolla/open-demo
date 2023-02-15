import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { User } from '@demo/+auth/core';
import { JwtAuthGuard, UseUser } from '@demo/+auth/server';

import { DiscussionService } from '../services/discussion.service';

@Controller({
  path: 'discussion',
  version: '1',
})
export class DiscussionController {
  constructor(private readonly _discussionService: DiscussionService) {}

  @Get(':identifier')
  @UseGuards(JwtAuthGuard)
  public async get(@Param('identifier') identifier: string, @UseUser() user: User) {
    return this._discussionService.get(identifier, user);
  }
}
