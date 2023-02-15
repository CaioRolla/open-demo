import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ProductData } from '@demo/wish-shared/core';
import { WishAppApplicationConfig } from '../wish-app-application.config';
import { errorHandler, fetchDataHandler } from '@demo/shared/utils';

@Injectable({
  providedIn: 'root',
})
export class ProductDataService {
  constructor(
    private readonly _http: HttpClient,
    private readonly _config: WishAppApplicationConfig
  ) {}

  public get(url: string): Observable<Partial<ProductData>> {
    return this._http
      .get(`${this._config.baseApi}/v1/product-data/${encodeURIComponent(url)}`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }
}
