import { Person } from '@demo/wish-shared/core';

export class PersonCreatedEvent {
  public static event = 'person.created';
  constructor(public person: Person) {}
}
