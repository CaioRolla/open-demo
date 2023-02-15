import { Injectable } from '@nestjs/common';
import { Repository, EntityRepository, Connection } from 'typeorm';

import { PersonEntity } from '../entities/person.entity';

@Injectable()
@EntityRepository(PersonEntity)
export class PersonRepository extends Repository<PersonEntity> {}

export const PersonRepositoryProvider = {
  provide: PersonRepository,
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(PersonRepository),
  inject: [Connection],
};
