import { DynamicModule, Module } from '@nestjs/common';
import {HttpModule } from '@nestjs/axios';
import { BeewService } from './services/beew.service';

import { SharedServerBeewConfig } from './shared-server-beew.config';
import { BeewController } from './controllers/beew.controller';

@Module({
  imports: [HttpModule],
  controllers: [BeewController],
  providers: [BeewService],
  exports: [BeewService],
})
export class SharedServerBeewModule {
  static forRoot(config: SharedServerBeewConfig): DynamicModule {
    return {
      module: SharedServerBeewModule,
      providers: [
        {
          provide: SharedServerBeewConfig,
          useValue: config,
        },
      ],
    };
  }
}
