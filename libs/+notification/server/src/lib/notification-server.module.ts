import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationController } from './controllers/notification.controller';

import { NotificationEntity } from './entities/notification.entity';

import { NotificationServerConfig } from './notification-server.config';
import {
  NotificationRepository,
  NotificationRepositoryProvider,
} from './repositories/notification.repository';
import { NotificationService } from './services/notification.service';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationEntity])],
  controllers: [NotificationController],
  providers: [NotificationRepositoryProvider, NotificationService],
  exports: [NotificationRepository, NotificationService],
})
export class NotificationServerModule {
  static forRoot(config: NotificationServerConfig): DynamicModule {
    return {
      module: NotificationServerModule,
      providers: [
        {
          provide: NotificationServerConfig,
          useValue: config,
        },
      ],
    };
  }
}
