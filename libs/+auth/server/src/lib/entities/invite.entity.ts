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

import { Account, Invite, InviteStatus, UserPermission } from '@demo/+auth/core';
import { AccountEntity } from './account.entity';

@Entity({ name: 'invite' })
export class InviteEntity implements Invite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AccountEntity)
  @JoinColumn()
  account: Account;

  @Column({ type: 'varchar', length: 36, default: InviteStatus.PENDING })
  status: InviteStatus;

  @Column({ type: 'simple-array' })
  permissions: UserPermission[];

  @Column({ type: 'varchar', length: 320, nullable: true })
  email: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date | null;

  @DeleteDateColumn({ select: false })
  deletedAt: Date | null;
}
