import { FindConditions, Like } from 'typeorm';
import DataObjectParser from 'dataobject-parser';

// type Field<Entity> = keyof Entity;

export const queryWhereHandler = <Entity>(
  original: FindConditions<Entity>,
  fields: string[],
  query?: string | null
): FindConditions<Entity>[] => {
  if (!query) {
    return [original];
  }

  const likeQ = query
    ? `%${query.replace(' ', '%').replace('.', '%').replace('-', '%')}%`
    : '%';

  return fields.map((field) => {
    const obj = new DataObjectParser();
    obj.set(field, Like(likeQ));

    return {
      ...original,
      ...obj.data(),
    };
  });
};
