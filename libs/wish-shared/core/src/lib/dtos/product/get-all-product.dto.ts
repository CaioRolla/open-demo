import { Asset } from '@demo/+asset/core';
import * as _ from 'lodash';
import { Person } from '../../entities/person.entity';
import { Product } from '../../entities/product.entity';

export interface GetAllProductDto {
  id: string;

  name: string;

  desc: string | null;

  estimatedPrice: number | null;

  url: string | null;

  person: Person | null; 

  previewUrl: string | null;

  createdAt: Date;
}

export const getAllProductFromProduct = (entity: Product): GetAllProductDto => {
  const images = entity.images.sort((a, b) => a.orderIndex - b.orderIndex);
  
  return {
    id: entity.id,
    name: entity.name,
    desc: entity.desc,
    estimatedPrice: entity.estimatedPrice,
    url: entity.url,
    person: entity.person,
    previewUrl: images[0]?.accessUrl || null,
    createdAt: entity.createdAt,
  };
};

export const getAllProductListFromProductList = (
  entities: Product[]
): GetAllProductDto[] => {
  return entities.map((sch) => getAllProductFromProduct(sch));
};
