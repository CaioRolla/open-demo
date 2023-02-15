import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  Generated,
} from 'typeorm';

import { Asset } from '@demo/+asset/core';
import { AssetEntity } from '@demo/+asset/server';
import { Account, User, UserPermission, UserStatus } from '@demo/+auth/core';
import { AccountEntity } from './account.entity';

@Entity({ name: 'user' })
export class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AccountEntity)
  @JoinColumn()
  account: Account;

  @Column('bool', { default: false})
  accountOwner: boolean;

  @Column()
  @Generated('uuid')
  apiKey: string;

  @Column({ type: 'varchar', length: 36, default: UserStatus.ACTIVE })
  status: UserStatus;

  @Column({ type: 'varchar', length: 36, nullable: true })
  confirmationToken: string | null;

  @Column({ type: 'varchar', length: 320, nullable: true })
  email?: string;

  @Column({ type: 'simple-array' })
  permissions: UserPermission[];

  @Column({ type: 'varchar', length: 500 })
  displayName: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  accessToken?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  refreshToken?: string;

  @Column({ type: 'text', nullable: true })
  profilePicUrl?: string;

  @Column({ type: 'varchar', length: 320, nullable: true, select: false })
  password?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  givenName?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  familyName?: string;

  @Column({ type: 'boolean', default: false })
  admin: boolean;

  @ManyToOne(() => AssetEntity, { eager: true })
  @JoinColumn()
  profile: Asset | null;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date | null;

  @DeleteDateColumn({ select: false })
  deletedAt: Date | null;
}
