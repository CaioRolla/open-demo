import { DynamicModule, Global, Module } from '@nestjs/common';

import { UploadConfig } from './upload.config';
import { UploadService } from './services/upload.service';

@Global()
@Module({
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {
  static forRoot(config: UploadConfig): DynamicModule {
    return {
      module: UploadModule,
      providers: [
        {
          provide: UploadConfig,
          useValue: config,
        },
      ],
    };
  }
}
