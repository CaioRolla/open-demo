import * as queryString from 'query-string';
import * as _ from 'lodash';
import { Product } from '../../entities/product.entity';

const AMAZON_AFFILIATE = 'listaideal20-20';
const MAGALU_URL = 'magazinevoce.com.br/magazinelistaideal10';

export interface PublicGetAllPublicProductDto {
  id: string;

  name: string;

  desc: string | null;

  estimatedPrice: number | null;

  url: string | null;

  takenBy: string | null;

  previewUrl: string | null;

  createdAt: Date;
}

export const getAllPublicProductFromProduct = (
  entity: Product
): PublicGetAllPublicProductDto => {
  const images = entity.images.sort((a, b) => a.orderIndex - b.orderIndex);
  return {
    id: entity.id,
    name: entity.name,
    desc: entity.desc,
    estimatedPrice: entity.estimatedPrice,
    url: entity.url ? handleUrlAffiliate(entity.url) : null,
    takenBy: entity.person?.email || null,
    previewUrl: images[0]?.accessUrl || null,
    createdAt: entity.createdAt,
  };
};

export const getAllPublicProductProductFromProductProduct = (
  entities: Product[]
): PublicGetAllPublicProductDto[] => {
  return entities.map((sch) => getAllPublicProductFromProduct(sch));
};

export const handleUrlAffiliate = (url: string) => {
  if ([MAGALU_URL].includes(url)) {
    return url;
  }

  const parsed = new URL(url);
  const hostname = parsed.hostname.replace('www.', '');

  if (['amazon.com.br', 'amazon.com'].includes(hostname)) {
    return `${url}?${queryString.stringify({ tag: AMAZON_AFFILIATE })}`;
  }

  if (['magazineluiza.com.br'].includes(hostname)) {
    return `${url.replace('magazineluiza.com.br', MAGALU_URL)}`;
  }

  if (['m.magazineluiza.com.br'].includes(hostname)) {
    return `${url.replace('m.magazineluiza.com.br', MAGALU_URL)}`;
  }

  // Handle magazineevoce links
  const withoutProtocol = url.split('https://').join('').split('http://').join('');
  const withoutProtocolAndWww = withoutProtocol.split('www.').join('');

  if(withoutProtocolAndWww.startsWith('magazinevoce.com.br')){
    const replaced =  withoutProtocolAndWww.split('/').map((segment, index) => {
      if(index === 1){
        return MAGALU_URL.split('/')[1]
      }

      return segment
    }).join('/');

    return `https://${replaced}`;
  }

  return url;
};
