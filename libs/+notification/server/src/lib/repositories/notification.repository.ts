import { Injectable } from '@nestjs/common';
import { Repository, EntityRepository, Connection } from 'typeorm';

import { NotificationEntity } from '../entities/notification.entity';

@Injectable()
@EntityRepository(NotificationEntity)
export class NotificationRepository extends Repository<NotificationEntity> {}

export const NotificationRepositoryProvider = {
  provide: NotificationRepository,
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(NotificationRepository),
  inject: [Connection],
};
