import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from '@demo/+auth/server';

import { Logger } from '@demo/shared-server/logging';
import { PersonCreatedEvent } from '../events/person/person-created.event';

@Injectable()
export class LogListener {
  constructor(private readonly _logger: Logger) {}

  @OnEvent(UserCreatedEvent.event)
  public async handleUserCreatedEvent(payload: UserCreatedEvent) {
    this._logger.log(`😊 A new user was created: ${payload.user.displayName}`);
  }

  @OnEvent(PersonCreatedEvent.event)
  public async handlePersonCreatedEvent(payload: PersonCreatedEvent) {
    this._logger.log(`👩‍💻 New person! [${payload.person.email}]`);
  }
}

