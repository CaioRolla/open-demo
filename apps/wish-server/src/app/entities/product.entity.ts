import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { numberTransformer } from '@demo/shared-server/utils/transformers';
import { List, Person, Product, ProductStatus } from '@demo/wish-shared/core';
import { AssetEntity } from '@demo/+asset/server';
import { Asset } from '@demo/+asset/core';
import { PersonEntity } from './person.entity';
import { ListEntity } from './list.entity';
import { AccountEntity } from '@demo/+auth/server';
import { Account } from '@demo/+auth/core';

@Entity({ name: 'product' })
export class ProductEntity implements Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AccountEntity)
  @JoinColumn()
  account: Account;

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

  @ManyToOne(() => ListEntity)
  @JoinColumn()
  list: List;

  @ManyToOne(() => PersonEntity, { cascade: true, eager: true })
  @JoinColumn()
  person: Person;

  @Column({ type: 'varchar', length: 100, default: ProductStatus.ACTIVE })
  status: ProductStatus;

  @ManyToMany(() => AssetEntity, { eager: true })
  @JoinTable()
  images: Asset[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date | null;

  @DeleteDateColumn({ select: false })
  deletedAt: Date | null;
}
