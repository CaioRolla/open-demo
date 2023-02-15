import { Inject, Injectable } from '@nestjs/common';

import { OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent, UserRepository } from '@demo/+auth/server';
import { Logger } from '@demo/shared-server/logging';

@Injectable()
export class UserListener {
  constructor(
    private readonly _logger: Logger,
  ) {}
}
