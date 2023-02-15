import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserEntity } from '@demo/+auth/server';
import { CreateDiscussionCommentDto, GetDiscussionCommentDto } from '@demo/+discussion/core';
import {
  DiscussionCommentEntity,
  discussionCommentToGetDiscussionCommentDto,
} from '../entities/discussion-comment.entity';
import { DiscussionCommentCreatedEvent } from '../events/discussion-comment/discussion-comment-created.event';
import { DiscussionCommentRepository } from '../repositories/discussion-comment.repository';
import { DiscussionRepository } from '../repositories/discussion.repository';

@Injectable()
export class DiscussionCommentService {
  constructor(
    private readonly _eventEmitter: EventEmitter2,
    private readonly _discussionRepository: DiscussionRepository,
    private readonly _discussionCommentRepository: DiscussionCommentRepository
  ) {}

  public async create(createDto: CreateDiscussionCommentDto, user: UserEntity): Promise<GetDiscussionCommentDto> {
    const { account } = user;

    const discussion = await this._discussionRepository.findOne({
      where: { id: createDto.discussionId, account },
    });

    if (!discussion) {
      throw new NotFoundException(['Discussion not found.']);
    }

    const comment = new DiscussionCommentEntity();
    comment.user = user;
    comment.content = createDto.content;
    comment.discussion = discussion;

    const { id } = await this._discussionCommentRepository.save(comment);

    const saved = await this._discussionCommentRepository.findOne({
      where: { id },
      relations: ['user', 'user.profile'],
    });

    this._eventEmitter.emit(DiscussionCommentCreatedEvent.event, new DiscussionCommentCreatedEvent(saved.id, user.id));

    return discussionCommentToGetDiscussionCommentDto(saved);
  }

  public async delete(commentId: string, user: UserEntity): Promise<void> {
    const comment = await this._discussionCommentRepository.findOne({
      where: { user, id: commentId },
    });

    if (!comment) {
      throw new NotFoundException(['Comment not found.']);
    }

    await this._discussionCommentRepository.softRemove(comment);
  }
}
