import { Product } from '../../entities/product.entity';

export interface SelectProductResponseDto {
  id: string;
  name: string;
  desc: string | null;
  url: string | null;
  previewUrl: string | null;
  createdAt: Date;
}

export const getSelectProductResponseFromProduct = (
  entity: Product
): SelectProductResponseDto => {
  const images = entity.images.sort((a, b) => a.orderIndex - b.orderIndex);

  return {
    id: entity.id,
    name: entity.name,
    desc: entity.desc,
    url: entity.url,
    previewUrl: images[0]?.accessUrl || null,
    createdAt: entity.createdAt,
  };
};
