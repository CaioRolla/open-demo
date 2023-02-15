import { HttpModule } from '@nestjs/axios';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AssetServerConfig } from './asset-server.config';
import { AssetController } from './controllers/asset.controller';
import { AssetEntity } from './entities/asset.entity';
import {
  AssetRepository,
  AssetRepositoryProvider,
} from './repositories/asset.repository';
import { AssetService } from './services/asset.service';

@Global()
@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([AssetEntity]),
  ],
  controllers: [AssetController],
  providers: [AssetRepositoryProvider, AssetService],
  exports: [AssetRepository, AssetService],
})
export class AssetServerModule {
  static forRoot(config: AssetServerConfig): DynamicModule {
    return {
      module: AssetServerModule,
      providers: [
        {
          provide: AssetServerConfig,
          useValue: config,
        },
      ],
    };
  }
}
