import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  List,
  CreateListDto,
  PatchListDto,
  GetAllListDto,
  GetPublicListDto,
} from '@demo/wish-shared/core';
import { WishAppApplicationConfig } from '../wish-app-application.config';
import {
  errorHandler,
  fetchDataHandler,
  GetAllQueryDto,
  GetAllResponseDto,
  requestHandler,
} from '@demo/shared/utils';
import { handleQuery } from '@demo/shared-app/utils/handlers';
@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(
    private readonly _http: HttpClient,
    private readonly _config: WishAppApplicationConfig
  ) {}

  public getAll(
    params: GetAllQueryDto
  ): Observable<GetAllResponseDto<GetAllListDto>> {
    return this._http
      .get(`${this._config.baseApi}/v1/list/all`, {
        params: handleQuery(params),
      })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public public(listSlug: string): Observable<GetPublicListDto> {
    return this._http
      .get(`${this._config.baseApi}/v1/list/${listSlug}/public`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public get(listId: string): Observable<List> {
    return this._http.get(`${this._config.baseApi}/v1/list/${listId}`).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(errorHandler(err));
      }),
      map((res) => fetchDataHandler(res))
    );
  }

  public delete(listId: string): Observable<void> {
    return this._http.delete(`${this._config.baseApi}/v1/list/${listId}`).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(errorHandler(err));
      }),
      map((res) => fetchDataHandler(res))
    );
  }

  public create(dto: CreateListDto): Observable<List> {
    return this._http
      .post(`${this._config.baseApi}/v1/list`, requestHandler(dto))
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public patch(dto: PatchListDto): Observable<List> {
    return this._http
      .patch(`${this._config.baseApi}/v1/list`, requestHandler(dto))
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }
}
