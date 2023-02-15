import { Product } from '@demo/wish-shared/core';

export class ProductUnselectedEvent {
  public static event = 'product.unselected';
  constructor(public productId: string, public personId: string) {}
}
