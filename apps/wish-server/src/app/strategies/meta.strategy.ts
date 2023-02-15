import * as cheerio from 'cheerio';

import { ProductData } from '@demo/wish-shared/core';
import { Strategy } from './base.strategy';

export class MetaStrategy implements Strategy {
  public async extract(
    html: string
  ): Promise<Partial<ProductData>> {
    const $ = cheerio.load(html);

    const title = $(`meta[name="title"]`).attr('content')?.trim();
    const description = $(`meta[name="description"]`).attr('content')?.trim();
    const ogTitle = $(`meta[property="og:title"]`).attr('content')?.trim();
    const ogDescription = $(`meta[property="og:description"]`)
      .attr('content')
      ?.trim();
    const ogImage = $(`meta[property="og:image"]`).attr('content')?.trim();
    const ogImageSecureURL = $(`meta[property="og:image:secure_url"]`)
      .attr('content')
      ?.trim();
    const ogPriceAmount = $(`meta[property="og:price:amount"]`)
      .attr('content')
      ?.trim();

    const image = ogImage || ogImageSecureURL || null;

    return {
      name: title || ogTitle || undefined,
      desc: description || ogDescription || undefined,
      images: image ? [image] : undefined,
      price: ogPriceAmount
        ? Number(ogPriceAmount.replace(',', '.'))
        : undefined,
    };
  }

  //   private _getMeta(name: string): string {
  //   const og = this.$(`meta[property="og:${name}"]`).attr('content')?.trim();
  //   const meta = this.$(`meta[name="${name}"]`).attr('content')?.trim();
  //   return og || meta;
  // }
}
