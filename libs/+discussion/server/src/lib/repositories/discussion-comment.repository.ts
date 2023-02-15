import { Injectable } from '@nestjs/common';
import { Repository, EntityRepository, Connection } from 'typeorm';

import { DiscussionCommentEntity } from '../entities/discussion-comment.entity';

@Injectable()
@EntityRepository(DiscussionCommentEntity)
export class DiscussionCommentRepository extends Repository<DiscussionCommentEntity> {}

export const DiscussionCommentRepositoryProvider = {
  provide: DiscussionCommentRepository,
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(DiscussionCommentRepository),
  inject: [Connection],
};
