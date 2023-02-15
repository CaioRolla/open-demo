import { Injectable } from '@nestjs/common';
import { Repository, EntityRepository, Connection } from 'typeorm';

import { AccountEntity } from '../entities/account.entity';

@Injectable()
@EntityRepository(AccountEntity)
export class AccountRepository extends Repository<AccountEntity> {}

export const AccountRepositoryProvider = {
  provide: AccountRepository,
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(AccountRepository),
  inject: [Connection],
};
