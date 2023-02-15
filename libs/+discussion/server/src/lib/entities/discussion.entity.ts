import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { AccountEntity } from '@demo/+auth/server';
import { DiscussionCommentEntity, discussionCommentToGetDiscussionCommentDto } from './discussion-comment.entity';
import { GetDiscussionDto } from '@demo/+discussion/core';

@Entity({ name: 'discussion' })
export class DiscussionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AccountEntity)
  @JoinColumn()
  account: AccountEntity;

  @Column({ type: 'varchar', length: 255 })
  key: string;

  @OneToMany(() => DiscussionCommentEntity, (task) => task.discussion, { cascade: true })
  comments: DiscussionCommentEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date | null;

  @DeleteDateColumn({ select: false })
  deletedAt: Date | null;
}

export const discussionToGetDiscussionDto = (discussion: DiscussionEntity): GetDiscussionDto => {
  return {
    id: discussion.id,
    key: discussion.key,
    comments: discussion.comments
      .sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime();
      })
      .map((comment) => discussionCommentToGetDiscussionCommentDto(comment)),
    createdAt: discussion.createdAt,
  };
};
