import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { jsonTransformer } from '@demo/shared-server/utils/transformers';
import { Notification, NotificationType } from '@demo/+notification/core';
import { User } from '@demo/+auth/core';
import { UserEntity } from '@demo/+auth/server';

@Entity({ name: 'notification' })
export class NotificationEntity implements Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user: User;

  @Column({ type: 'varchar', length: 25, default: NotificationType.SIMPLE })
  type: NotificationType;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  desc: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  url: string | null;

  @Column({ type: 'boolean', default: false })
  viewed: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date | null;

  @DeleteDateColumn({ select: false })
  deletedAt: Date | null;
}
