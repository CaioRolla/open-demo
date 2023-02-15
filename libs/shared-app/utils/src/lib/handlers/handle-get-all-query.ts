import { GetAllQueryDto } from '@demo/shared/utils';
import { HttpParams } from '@angular/common/http';

export const handleQuery = <T extends GetAllQueryDto>(
  query?: T
): HttpParams => {
  if (!query) {
    return {} as HttpParams;
  }

  const params = {};

  Object.keys(query).forEach((key) => {
    /* @ts-ignore */
    if (query[key] !== undefined && query[key] !== null) {
      /* @ts-ignore */
      if (Array.isArray(query[key]) && query[key].length > 0) {
        /* @ts-ignore */
        params[key] = query[key].join(',');
      }

      /* @ts-ignore */
      if (!Array.isArray(query[key])) {
        /* @ts-ignore */
        params[key] = `${query[key]}`;
      }
    }
  });

  return params as HttpParams;
};
