import { ProductData } from '@demo/wish-shared/core';

export interface Strategy {
  extract(html: string): Promise<Partial<ProductData>>;
}
