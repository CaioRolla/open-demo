import { Injectable } from '@nestjs/common';
import { UserRepository } from '@demo/+auth/server';
import { NotificationEntity } from '../entities/notification.entity';
import {
  SendNotificationToAccountDto,
  SendNotificationToUserDto,
} from '../interfaces';
import { NotificationRepository } from '../repositories/notification.repository';
import { Notification, NotificationType } from '@demo/+notification/core';
import { User } from '@demo/+auth/core';

@Injectable()
export class NotificationService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _notificationRepository: NotificationRepository
  ) {}

  public async markAsViewed(user: User): Promise<void> {
    await this._notificationRepository.update(
      { user, viewed: false },
      { viewed: true }
    );
  }

  public async getMy(user: User): Promise<Notification[]> {
    const NOTIFICATION_SOFT_LIMIT = 6;

    const notifications = await this._notificationRepository.find({
      where: { user },
      order: {createdAt: 'DESC'}
    });

    const unviwedNotifications = notifications.filter((n) => !n.viewed);
    const unviwedCount = unviwedNotifications.length;

    if (unviwedCount >= NOTIFICATION_SOFT_LIMIT) {
      return unviwedNotifications;
    }

    return notifications.slice(0, NOTIFICATION_SOFT_LIMIT);
  }

  public async sendToUser(
    dto: SendNotificationToUserDto
  ): Promise<Notification> {
    const user = await this._userRepository.findOne({ id: dto.userId });

    if (!user) {
      throw new Error('User not found.');
    }

    const notification = new NotificationEntity();

    notification.user = user;
    notification.title = dto.title;
    notification.desc = dto.desc;
    notification.type = dto.type;
    notification.url = dto.url;

    const savedNotification = await this._notificationRepository.save(
      notification
    );

    // TODO: Send notification to user!

    return savedNotification;
  }

  public async sendToAccount(
    dto: SendNotificationToAccountDto
  ): Promise<Notification[]> {
    const users = await this._userRepository.find({
      where: { account: { id: dto.accountId } },
      relations: ['account'],
    });

    const notifications = Promise.all(
      users.map((user) => {
        const notification = new NotificationEntity();

        notification.user = user;
        notification.title = dto.title;
        notification.desc = dto.desc;
        notification.type = dto.type;
        notification.url = dto.url;

        return this._notificationRepository.save(notification);
      })
    );

    // TODO: Send notifications to users!

    return notifications;
  }
}
