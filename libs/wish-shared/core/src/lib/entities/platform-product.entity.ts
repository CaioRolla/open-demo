import { Asset } from '@demo/+asset/core';

export enum PlatformProductStatus {
  ACTIVE = 'ACTIVE',
}

export interface PlatformProduct {
  id: string;

  name: string;

  desc: string | null;

  url: string | null;

  estimatedPrice: number | null;

  status: PlatformProductStatus;

  images: Asset[];

  createdAt: Date;

  updatedAt: Date | null;

  deletedAt: Date | null;
}
