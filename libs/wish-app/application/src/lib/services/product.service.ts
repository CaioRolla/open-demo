import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  Product,
  CreateProductDto,
  PatchProductDto,
  GetAllProductDto,
  GetAllProductQueryDto,
  SelectProductDto,
  SelectProductResponseDto,
  UnselectProductDto,
  ClonePlatformProductDto,
} from '@demo/wish-shared/core';
import { WishAppApplicationConfig } from '../wish-app-application.config';
import {
  errorHandler,
  fetchDataHandler,
  GetAllResponseDto,
  requestHandler,
} from '@demo/shared/utils';
import { handleQuery } from '@demo/shared-app/utils/handlers';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private readonly _http: HttpClient,
    private readonly _config: WishAppApplicationConfig
  ) {}

  public clonePlatformProduct(
    dto: ClonePlatformProductDto
  ): Observable<Product[]> {
    return this._http
      .post(
        `${this._config.baseApi}/v1/product/clone-platform-product`,
        requestHandler(dto)
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public unselect(dto: UnselectProductDto): Observable<void> {
    return this._http
      .post(`${this._config.baseApi}/v1/product/unselect`, requestHandler(dto))
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public select(dto: SelectProductDto): Observable<SelectProductResponseDto> {
    return this._http
      .post(`${this._config.baseApi}/v1/product/select`, requestHandler(dto))
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public getAll(
    params: GetAllProductQueryDto
  ): Observable<GetAllResponseDto<GetAllProductDto>> {
    return this._http
      .get(`${this._config.baseApi}/v1/product/all`, {
        params: handleQuery(params),
      })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public get(productId: string): Observable<Product> {
    return this._http
      .get(`${this._config.baseApi}/v1/product/${productId}`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public delete(productId: string): Observable<void> {
    return this._http
      .delete(`${this._config.baseApi}/v1/product/${productId}`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public create(dto: CreateProductDto): Observable<Product> {
    return this._http
      .post(`${this._config.baseApi}/v1/product`, requestHandler(dto))
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public patch(dto: PatchProductDto): Observable<Product> {
    return this._http
      .patch(`${this._config.baseApi}/v1/product`, requestHandler(dto))
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }
}
