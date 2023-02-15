import { DynamicModule, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { LoggingModule } from '@demo/shared-server/logging';
import { SitemapController } from './controllers/sitemap.controller';
import { SitemapService } from './services/sitemap.service';
import { SharedServerSitemapConfig } from './shared-server-sitemap.config';

@Module({
  imports:[
    HttpModule,
    LoggingModule
  ],
  controllers: [SitemapController],
  providers: [SitemapService],
  exports: [SitemapService],
})
export class SharedServerSitemapModule {
  static forRoot(config: SharedServerSitemapConfig): DynamicModule {
    return {
      module: SharedServerSitemapModule,
      providers: [
        {
          provide: SharedServerSitemapConfig,
          useValue: config,
        },
      ],
    };
  }
}
