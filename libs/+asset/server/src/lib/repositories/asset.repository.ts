import { Injectable } from '@nestjs/common';
import { Repository, EntityRepository, Connection } from 'typeorm';

import { AssetEntity } from '../entities/asset.entity';

@Injectable()
@EntityRepository(AssetEntity)
export class AssetRepository extends Repository<AssetEntity> {}

export const AssetRepositoryProvider = {
  provide: AssetRepository,
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(AssetRepository),
  inject: [Connection],
};
