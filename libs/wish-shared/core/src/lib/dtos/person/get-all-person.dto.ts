import * as _ from 'lodash';
import { Person } from '../../entities/person.entity';

export interface GetAllPersonDto {
  id: string;

  name: string;

  email: string;

  createdAt: Date;
}

export const getAllPersonFromPerson = (entity: Person): GetAllPersonDto => {
  return {
    id: entity.id,
    name: entity.name,
    email: entity.email,
    createdAt: entity.createdAt,
  };
};

export const getAllPersonPersonFromPersonPerson = (
  entities: Person[]
): GetAllPersonDto[] => {
  return entities.map((sch) => getAllPersonFromPerson(sch));
};
