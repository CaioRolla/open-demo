import { ProductData } from '@demo/wish-shared/core';
import { Strategy } from './base.strategy';
import { MetaStrategy } from './meta.strategy';
import { SchemaStrategy } from './schema.strategy';
import * as _ from 'lodash';

export class DefaultStrategy implements Strategy {
  public async extract(html: string): Promise<Partial<ProductData>> {
    const schemaStrategy = new SchemaStrategy();
    const metaStategy = new MetaStrategy();

    const fromSchema = await schemaStrategy.extract(html);

    const fromMeta = await metaStategy.extract(html);

    const result: Partial<ProductData> = {
      name: fromSchema.name || fromMeta.name,
      desc: fromSchema.desc || fromMeta.desc,
      images: _.uniq(fromSchema.images || fromMeta.images),
      price: fromSchema.price || fromMeta.price,
    };

    return { ...result };
  }
}
