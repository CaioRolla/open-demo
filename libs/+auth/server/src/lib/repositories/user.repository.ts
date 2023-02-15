import { Injectable } from '@nestjs/common';
import { Repository, EntityRepository, Connection } from 'typeorm';

import { UserEntity } from '../entities/user.entity';

@Injectable()
@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}

export const UserRepositoryProvider = {
  provide: UserRepository,
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(UserRepository),
  inject: [Connection],
};
