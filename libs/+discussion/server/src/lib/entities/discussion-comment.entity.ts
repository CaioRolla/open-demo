import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

import { UserEntity } from '@demo/+auth/server';
import { DiscussionEntity } from './discussion.entity';
import { GetDiscussionCommentDto } from '@demo/+discussion/core';

@Entity({ name: 'discussion_comment' })
export class DiscussionCommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => DiscussionEntity)
  @JoinColumn()
  discussion: DiscussionEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date | null;

  @DeleteDateColumn({ select: false })
  deletedAt: Date | null;
}

export const discussionCommentToGetDiscussionCommentDto = (comment: DiscussionCommentEntity): GetDiscussionCommentDto => {
  return {
    id: comment.id,
    userId: comment.user.id,
    userDisplayName: comment.user.displayName,
    userProfileUrl: comment.user.profile?.url || null,
    content: comment.content,
    createdAt: comment.createdAt,
  };
};
