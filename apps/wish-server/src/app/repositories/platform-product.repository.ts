import { Injectable } from '@nestjs/common';
import { Repository, EntityRepository, Connection } from 'typeorm';

import { PlatformProductEntity } from '../entities/platform-product.entity';

@Injectable()
@EntityRepository(PlatformProductEntity)
export class PlatformProductRepository extends Repository<PlatformProductEntity> {}

export const PlatformProductRepositoryProvider = {
  provide: PlatformProductRepository,
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(PlatformProductRepository),
  inject: [Connection],
};
