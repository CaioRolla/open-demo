import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { List, ListStatus, ListTheme, Product } from '@demo/wish-shared/core';
import { AccountEntity } from '@demo/+auth/server';
import { Account } from '@demo/+auth/core';
import { AssetEntity } from '@demo/+asset/server';
import { Asset } from '@demo/+asset/core';
import { ProductEntity } from './product.entity';
import { ListThemeEmbed } from './embeds/list-theme.embed';

@Entity({ name: 'list' })
export class ListEntity implements List {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AccountEntity)
  @JoinColumn()
  account: Account;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  slug: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  shortUrl: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  desc: string | null;

  @Column(() => ListThemeEmbed)
  theme: ListTheme;

  @OneToMany(() => ProductEntity, (product) => product.list)
  products: Product[];

  @Column({ type: 'varchar', length: 100, default: ListStatus.ACTIVE })
  status: ListStatus;

  @Column({ type: 'timestamp', nullable: true })
  eventDate: Date | null;

  @Column({ type: 'varchar', length: 300 })
  eventLocation: string | null;

  @ManyToOne(() => AssetEntity)
  @JoinColumn()
  profile: Asset | null;

  @ManyToOne(() => AssetEntity)
  @JoinColumn()
  banner: Asset | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  pix: string | null; 

  @Column({ type: 'text', nullable: true })
  pixCode: string | null; 

  @Column({ type: 'text', nullable: true })
  pixQr: string | null; 

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date | null;

  @DeleteDateColumn({ select: false })
  deletedAt: Date | null;
}
