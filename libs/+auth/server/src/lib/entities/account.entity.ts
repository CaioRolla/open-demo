import { Account, AccountStatus, Invite, User } from '@demo/+auth/core';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { InviteEntity } from './invite.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'account' })
export class AccountEntity implements Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => UserEntity, (user) => user.account)
  users: User[];

  @OneToMany(() => InviteEntity, (invite) => invite.account)
  invites: Invite[];

  @Column({ type: 'varchar', length: 100 })
  status: AccountStatus;

  @Column({ type: 'varchar', length: 100 })
  plan: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  planType?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  stripeSubscriptionId?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  stripeCustomerId?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date | null;

  @DeleteDateColumn({ select: false })
  deletedAt: Date | null;
}
