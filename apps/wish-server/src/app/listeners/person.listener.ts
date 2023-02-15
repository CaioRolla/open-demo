import { Inject, Injectable } from '@nestjs/common';

import { OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent, UserRepository } from '@demo/+auth/server';
import { Logger } from '@demo/shared-server/logging';
import { PersonCreatedEvent } from '../events/person/person-created.event';
// const human = require('humanparser');

@Injectable()
export class PersonListener {
  constructor(
    private readonly _logger: Logger,

  ) {}


}
