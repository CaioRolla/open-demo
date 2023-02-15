import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, UserEntity, UseUser } from '@demo/+auth/server';
import { CreateDiscussionCommentDto } from '@demo/+discussion/core';
import { DiscussionCommentService } from '../services/discussion-comment.service';

@Controller({
  path: 'discussion-comment',
  version: '1',
})
export class DiscussionCommentController {
  constructor(private readonly _discussionCommentService: DiscussionCommentService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  public async get(@Body() createDto: CreateDiscussionCommentDto, @UseUser() user: UserEntity) {
    return this._discussionCommentService.create(createDto, user);
  }

  @Delete(':identifier')
  @UseGuards(JwtAuthGuard)
  public async delete(@Param('identifier') identifier: string, @UseUser() user: UserEntity) {
    return this._discussionCommentService.delete(identifier, user);
  }
}
