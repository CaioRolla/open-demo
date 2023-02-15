import { List } from './list.entity';

export interface Person {
  id: string;

  name: string;

  email: string;

  createdAt: Date;

  updatedAt: Date | null;

  deletedAt: Date | null;
}
