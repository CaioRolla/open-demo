import { compareTwoStrings } from 'string-similarity';
import * as _ from 'lodash';

export const searchMatchHandler = (target: string | null, search: string) => {
  if (!target) return false;

  const lTarget = _.deburr(target.toLowerCase());
  const lSearch = _.deburr(search.toLowerCase());

  if (lTarget === lSearch) return true;
  if (lTarget.includes(lSearch)) return true;

  const rTarget = lTarget.replace(/[^\w\s]/gi, '').split('_').join('');
  const rSearch = lSearch.replace(/[^\w\s]/gi, '').split('_').join('');

  if (rTarget === rSearch) return true;
  if (rTarget.includes(rSearch)) return true;

  return compareTwoStrings(lTarget, lSearch) > 0.8;
};
