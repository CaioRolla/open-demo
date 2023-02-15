import { User } from '@demo/+auth/core';

export enum NotificationType {
  SIMPLE = 'SIMPLE',
}

export interface Notification {
  id: string;

  user: User;

  type: NotificationType;

  title: string;

  desc: string | null;

  url: string | null;

  viewed: boolean;

  createdAt: Date;

  updatedAt: Date | null;

  deletedAt: Date | null;
}
