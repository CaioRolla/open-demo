import * as _ from 'lodash';
import { PlatformProduct } from '../../entities/platform-product.entity';

export interface GetAllPlatformProductDto {
  id: string;

  name: string;

  desc: string | null;

  estimatedPrice: number | null;

  url: string | null;

  previewUrl: string | null;

  createdAt: Date;
}

export const getAllPlatformProductFromPlatformProduct = (
  entity: PlatformProduct
): GetAllPlatformProductDto => {
  const images = entity.images.sort((a, b) => a.orderIndex - b.orderIndex);

  return {
    id: entity.id,
    name: entity.name,
    desc: entity.desc,
    estimatedPrice: entity.estimatedPrice,
    url: entity.url,
    previewUrl: images[0]?.accessUrl || null,
    createdAt: entity.createdAt,
  };
};

export const getAllPlatformProductListFromPlatformProductList = (
  entities: PlatformProduct[]
): GetAllPlatformProductDto[] => {
  return entities.map((sch) => getAllPlatformProductFromPlatformProduct(sch));
};
