import { Asset } from '@demo/+asset/core';
import { Account } from '@demo/+auth/core';
import { List } from './list.entity';
import { Person } from './person.entity';

export enum ProductStatus {
  ACTIVE = 'ACTIVE'
}

export interface Product {
  id: string;

  name: string;

  account: Account;

  desc: string | null;

  url: string | null;

  estimatedPrice: number | null;

  list: List;

  person: Person;

  status: ProductStatus;

  images: Asset[];

  createdAt: Date;

  updatedAt: Date | null;

  deletedAt: Date | null;
}
