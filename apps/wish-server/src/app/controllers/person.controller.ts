import { Controller } from '@nestjs/common';
import { PersonService } from '../services/person.service';

@Controller({
  version: '1',
  path: 'person',
})
export class PersonController {
  constructor(private readonly _personService: PersonService) {}
}
