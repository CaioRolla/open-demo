import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserEntity } from '@demo/+auth/server';
import { GetDiscussionDto } from '@demo/+discussion/core';
import { DiscussionEntity, discussionToGetDiscussionDto } from '../entities/discussion.entity';
import { DiscussionCreatedEvent } from '../events/discussion/discussion-created.event';
import { DiscussionRepository } from '../repositories/discussion.repository';

@Injectable()
export class DiscussionService {
  constructor(
    private readonly _discussionRepository: DiscussionRepository,
    private readonly _eventEmitter: EventEmitter2
  ) {}

  public async get(identifier: string, user: UserEntity): Promise<GetDiscussionDto> {
    const { account } = user;

    const existing = await this._discussionRepository.findOne({
      where: [
        { id: identifier, account },
        { key: identifier, account },
      ],
      relations: ['comments', 'comments.user'],
    });

    if (!existing) {
      const discussion = new DiscussionEntity();

      discussion.account = account;
      discussion.key = identifier;
      discussion.comments = [];

      const saved = await this._discussionRepository.save(discussion);

      this._eventEmitter.emit(DiscussionCreatedEvent.event, new DiscussionCreatedEvent(saved.id, user.id));

      return discussionToGetDiscussionDto(saved);
    }

    return discussionToGetDiscussionDto(existing);
  }
}
