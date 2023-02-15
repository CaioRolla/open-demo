import { Injectable } from '@nestjs/common';
import { Repository, EntityRepository, Connection } from 'typeorm';

import { ListEntity } from '../entities/list.entity';

@Injectable()
@EntityRepository(ListEntity)
export class ListRepository extends Repository<ListEntity> {}

export const ListRepositoryProvider = {
  provide: ListRepository,
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(ListRepository),
  inject: [Connection],
};
