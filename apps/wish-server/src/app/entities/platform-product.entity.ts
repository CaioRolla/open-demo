import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { numberTransformer } from '@demo/shared-server/utils/transformers';
import { PlatformProduct, PlatformProductStatus } from '@demo/wish-shared/core';
import { AssetEntity } from '@demo/+asset/server';
import { Asset } from '@demo/+asset/core';

@Entity({ name: 'platform_product' })
export class PlatformProductEntity implements PlatformProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  desc: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  url: string | null;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    transformer: numberTransformer,
    nullable: true,
  })
  estimatedPrice: number | null;

  @Column({
    type: 'varchar',
    length: 100,
    default: PlatformProductStatus.ACTIVE,
  })
  status: PlatformProductStatus;

  @ManyToMany(() => AssetEntity, { eager: true })
  @JoinTable({ name: 'platform_product_images_asset_2' })
  images: Asset[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date | null;

  @DeleteDateColumn({ select: false })
  deletedAt: Date | null;
}
