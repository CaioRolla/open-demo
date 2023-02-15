import * as cheerio from 'cheerio';

import { ProductData } from '@demo/wish-shared/core';
import { Strategy } from './base.strategy';

export class SchemaStrategy implements Strategy {
  public async extract(html: string): Promise<Partial<ProductData>> {
    const $ = cheerio.load(html);

    const lds = $('script[type="application/ld+json"]')
      .toArray()
      .map((el) => el.children.map((ch) => ch['data']))
      .flat()
      .map((str) => JSON.parse(str));

    const productLd = lds.find((ld) => ld['@type'] === 'Product');

    if (productLd) {
      // TODO: Best solution?
      // For reference: offers can be array or objects
      const offer = productLd['offers'][0] || productLd['offers'];
      const images = productLd['image'];
      const price = offer
        ? Number(
            typeof offer['price'] === 'string' ||
              offer['price'] instanceof String
              ? offer['price'].replace(',', '.')
              : offer['price']
          )
        : undefined;

      return {
        name: productLd['name'],
        desc: productLd['description'],
        price,
        images:
          images && images.length
            ? Array.isArray(images)
              ? images
              : [images]
            : undefined,
      };
    }

    return {};
  }
}
