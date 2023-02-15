import { Product } from '@demo/wish-shared/core';

export class ProductSelectedEvent {
  public static event = 'product.selected';
  constructor(public productId: string) {}
}
