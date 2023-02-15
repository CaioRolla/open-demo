import { Injectable } from '@nestjs/common';
import { Repository, EntityRepository, Connection } from 'typeorm';

import { DiscussionEntity } from '../entities/discussion.entity';

@Injectable()
@EntityRepository(DiscussionEntity)
export class DiscussionRepository extends Repository<DiscussionEntity> {}

export const DiscussionRepositoryProvider = {
  provide: DiscussionRepository,
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(DiscussionRepository),
  inject: [Connection],
};
