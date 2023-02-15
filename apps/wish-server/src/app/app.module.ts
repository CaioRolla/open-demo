import { CacheModule, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailerModule } from '@nestjs-modules/mailer';
import { S3Module } from 'nestjs-s3';

import { LoggingModule, slackLoggerFactory } from '@demo/shared-server/logging';
import { AuthServerModule } from '@demo/+auth/server';
import { HealthServerModule } from '@demo/health/server';
import { ListController } from './controllers/list.controller';
import { PersonController } from './controllers/person.controller';
import { ProductController } from './controllers/product.controller';
import { ListRepositoryProvider } from './repositories/list.repository';
import { PersonRepositoryProvider } from './repositories/person.repository';
import { ProductRepositoryProvider } from './repositories/product.repository';
import { ListService } from './services/list.service';
import { PersonService } from './services/person.service';
import { ProductService } from './services/product.service';
import { AssetServerModule } from '@demo/+asset/server';
import { UploadModule } from '@demo/shared-server/upload';
import { ShopeeModule } from '@demo/shared-server/shopee';
import ormconfig from '../ormconfig';
import mailerconfig from '../mailerconfig';
import { ProductDataService } from './services/product-data.service';
import { ProductDataController } from './controllers/product-data.controller';
import { ProductListener } from './listeners/product.listener';
import { LogListener } from './listeners/log.listener';
import { UserListener } from './listeners/user.listener';
import { PersonListener } from './listeners/person.listener';
import { PlatformProductRepositoryProvider } from './repositories/platform-product.repository';
import { PlatformProductController } from './controllers/platform-product.controller';
import { PlatformProductService } from './services/platform-product.service';

@Module({
  imports: [
    HttpModule,
    HealthServerModule,
    LoggingModule,
    CacheModule.register(),
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot(ormconfig),
    AuthServerModule.forRoot({
      appName: 'Lista Ideal',
      appLogo: 'https://listaideal.s3.us-east-1.amazonaws.com/logo.png',
      appHost: 'listaideal.com.br',
      appBasePath: process.env.BASE_APP_PATH,
      baseApi: process.env.BASE_API_PATH,
      userDefaultPermissions: [],
    }),
    MailerModule.forRoot(mailerconfig),
    S3Module.forRoot({
      config: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
        region: process.env.AWS_S3_REGION,
      },
    }),
    UploadModule.forRoot({ s3BucketName: process.env.AWS_S3_BUCKET }),
    AssetServerModule.forRoot({}),
    ShopeeModule.forRoot({
      appId: process.env.SHOPEE_APP_ID,
      secret: process.env.SHOPEE_SECRET,
    }),
  ],
  controllers: [
    ListController,
    PersonController,
    ProductController,
    ProductDataController,
    PlatformProductController,
  ],
  providers: [
    PersonListener,
    UserListener,
    ProductListener,
    LogListener,
    ListService,
    ProductService,
    PersonService,
    ListRepositoryProvider,
    PersonRepositoryProvider,
    ProductRepositoryProvider,
    PlatformProductRepositoryProvider,
    ProductDataService,
    PlatformProductService,
    slackLoggerFactory({
      botToken: process.env.SLACK_BOT_TOKEN,
      logChannelId: 'C042TEHEFBK',
      warnChannelId: 'C04287HSHSA',
      errorChannelId: 'C04287HSHSA',
    }),
  ],
})
export class AppModule {}
