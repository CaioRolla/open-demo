import { Asset } from '@demo/+asset/core';
import { Account } from '@demo/+auth/core';
import { Product } from './product.entity';

export enum ListStatus {
  ACTIVE = 'ACTIVE',
  STOPPED = 'STOPPED',
}

export interface ListTheme {
  id: string;

  background: string | null;

  color: string | null;

  borderColor: string | null;
}

export interface List {
  id: string;

  account: Account;

  name: string;

  slug: string;

  shortUrl: string | null;

  desc: string | null;

  theme: ListTheme;

  products: Product[];

  status: ListStatus;

  profile: Asset | null;

  banner: Asset | null;

  eventDate: Date | null;

  eventLocation: string | null;

  pix: string | null;
  
  pixQr: string | null;

  pixCode: string | null;

  createdAt: Date;

  updatedAt: Date | null;

  deletedAt: Date | null;
}
