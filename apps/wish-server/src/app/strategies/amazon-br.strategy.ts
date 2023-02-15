import * as cheerio from 'cheerio';
import * as _ from 'lodash';

import { ProductData } from '@demo/wish-shared/core';
import { Strategy } from './base.strategy';
import { DefaultStrategy } from './default.strategy';

export class AmazonBRStrategy implements Strategy {
  public async extract(html: string): Promise<Partial<ProductData>> {
    const defaultStrategy = new DefaultStrategy();
    const $ = cheerio.load(html);

    const fromDefault = await defaultStrategy.extract(html);

    const imageOpt01 = $(`[data-old-hires]`).attr('src')?.trim();
    const imageOpt02 = $(`[data-a-image-name]`).attr('src')?.trim();
    const imageOpt03 = $(`[data-a-dynamic-image]`).attr('src')?.trim();

    const images = _.uniq(
      [imageOpt01, imageOpt02, imageOpt03].filter((v) => !!v)
    );

    const priceArrayString = $(`.twister-plus-buying-options-price-data`)
      .eq(0)
      .text()
      .trim();

    const removeText = [
      'Compre online ',
      'Frete GRÁTIS em milhares de produtos com o Amazon Prime.',
    ];

    let desc = fromDefault.desc || '';

    removeText.forEach(text => {
      desc = desc.replace(text, '')
    });

    let result: Partial<ProductData> = {
      name: fromDefault.name.replace('| Amazon.com.br', ''),
      desc,
      images: images.length > 0 ? images : fromDefault.images,
      price: fromDefault.price,
    };

    try {
      const priceArray = JSON.parse(priceArrayString);

      if (priceArray && priceArray[0]) {
        result = {
          ...result,
          price: priceArray[0]['priceAmount'],
        };
      }
    } catch (error) {}

    return { ...result };
  }
}
