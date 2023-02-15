import { IsString, IsUUID } from 'class-validator';

import { CreateDiscussionCommentDto as ICreateDiscussionCommentDto } from '@demo/+discussion/core';

export class CreateDiscussionCommentDto implements ICreateDiscussionCommentDto {
  @IsUUID(4)
  discussionId: string;

  @IsString()
  content: string;
}
