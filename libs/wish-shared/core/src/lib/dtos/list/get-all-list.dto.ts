import { Asset } from '@demo/+asset/core';
import * as _ from 'lodash';
import { List, ListStatus } from '../../entities/list.entity';

export interface GetAllListDto {
  id: string;

  status: ListStatus;

  name: string;

  slug: string;

  desc: string | null;

  profileUrl: string | null;

  createdAt: Date;
}

export const getAllListFromList = (entity: List): GetAllListDto => {
  return {
    id: entity.id,
    name: entity.name,
    slug: entity.slug,
    desc: entity.desc,
    profileUrl: entity.profile?.accessUrl || null,
    status: entity.status,
    createdAt: entity.createdAt,
  };
};

export const getAllListListFromListList = (
  entities: List[]
): GetAllListDto[] => {
  return entities.map((sch) => getAllListFromList(sch));
};
