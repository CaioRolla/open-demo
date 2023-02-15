import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { GetAllPlatformProductDto } from '@demo/wish-shared/core';
import { WishAppApplicationConfig } from '../wish-app-application.config';
import {
  errorHandler,
  fetchDataHandler,
  GetAllQueryDto,
  GetAllResponseDto,
} from '@demo/shared/utils';
import { handleQuery } from '@demo/shared-app/utils/handlers';
@Injectable({
  providedIn: 'root',
})
export class PlatformProductService {
  constructor(
    private readonly _http: HttpClient,
    private readonly _config: WishAppApplicationConfig
  ) {}

  public getAll(
    params: GetAllQueryDto
  ): Observable<GetAllResponseDto<GetAllPlatformProductDto>> {
    return this._http
      .get(`${this._config.baseApi}/v1/platform-product/all`, {
        params: handleQuery(params),
      })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }
}
