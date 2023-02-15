import { Injectable } from '@nestjs/common';
import { Repository, EntityRepository, Connection } from 'typeorm';

import { InviteEntity } from '../entities/invite.entity';

@Injectable()
@EntityRepository(InviteEntity)
export class InviteRepository extends Repository<InviteEntity> {}

export const InviteRepositoryProvider = {
  provide: InviteRepository,
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(InviteRepository),
  inject: [Connection],
};
