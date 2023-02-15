import { AccountEntity, InviteEntity, UserEntity } from '@demo/+auth/server';
import { AssetEntity } from '@demo/+asset/server';
import { ListEntity } from './app/entities/list.entity';
import { PersonEntity } from './app/entities/person.entity';
import { ProductEntity } from './app/entities/product.entity';
import { PlatformProductEntity } from './app/entities/platform-product.entity';

export default {
  type: process.env.DATABASE_TYPE as any,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  charset: 'utf8mb4',
  extra: {
    charset: 'utf8mb4',
  },
  logging: false,
  cache: false,
  entities: [
    UserEntity,
    AccountEntity,
    InviteEntity,
    ListEntity,
    PersonEntity,
    ProductEntity,
    AssetEntity,
    PlatformProductEntity
  ],
  migrations:
    process.env.NODE_ENV === 'migration'
      ? [
          __dirname + '/../migration/*{.ts,.js}',
          __dirname + '/../../../libs/+auth/server/migration/*{.ts,.js}',
          __dirname + '/../../../libs/+asset/server/migration/*{.ts,.js}',
        ]
      : [],
  cli: {
    migrationsDir: 'apps/wish-server/migration/',
  },
  synchronize: false,
};
