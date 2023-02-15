import { Injectable } from '@nestjs/common';
import { Repository, EntityRepository, Connection } from 'typeorm';

import { ProductEntity } from '../entities/product.entity';

@Injectable()
@EntityRepository(ProductEntity)
export class ProductRepository extends Repository<ProductEntity> {}

export const ProductRepositoryProvider = {
  provide: ProductRepository,
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(ProductRepository),
  inject: [Connection],
};
