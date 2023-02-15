import { Global, Module } from '@nestjs/common';

import { Logger } from './services/logger.service';

@Global()
@Module({
  controllers: [],
  providers: [
    Logger
  ],
  exports: [Logger],
})
export class LoggingModule {}
