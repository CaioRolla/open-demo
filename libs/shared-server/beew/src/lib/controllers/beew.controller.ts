import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Logger } from '@demo/shared-server/logging';

// import { BeewEvent } from '../interfaces';

@Controller({
  path: 'beew',
  version: '1',
})
export class BeewController {
  constructor(
    private _eventEmitter: EventEmitter2,
    private readonly _logger: Logger
  ) {}

  @Post()
  public webhook(@Body() body: any) {
    try {
      this._eventEmitter.emit(body.event, body);
      return 'OK';
    } catch (err) {
      this._logger.error(`hooks`, err);
      throw new BadRequestException();
    }
  }
}
