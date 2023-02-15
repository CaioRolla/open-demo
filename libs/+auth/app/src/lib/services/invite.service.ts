import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AcceptInviteDto,
  CreateInviteDto,
  GetAllInviteDto,
  Invite,
  PatchInviteDto,
  RefuseInviteDto,
  ResendInviteDto,
} from '@demo/+auth/core';
import {
  errorHandler,
  fetchDataHandler,
  GetAllQueryDto,
  GetAllResponseDto,
  requestHandler,
} from '@demo/shared/utils';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthConfig } from '../auth-app.config';
import { handleQuery } from '@demo/shared-app/utils/handlers';

@Injectable({
  providedIn: 'root',
})
export class InviteService {
  constructor(
    private readonly _http: HttpClient,
    private readonly _config: AuthConfig
  ) {}

  public resend(dto: ResendInviteDto): Observable<Invite> {
    return this._http
      .post(`${this._config.baseApi}/v1/invite/resend`, requestHandler(dto))
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public accept(dto: AcceptInviteDto): Observable<void> {
    return this._http
      .post(`${this._config.baseApi}/v1/invite/accept`, requestHandler(dto))
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public refuse(dto: RefuseInviteDto): Observable<void> {
    return this._http
      .post(`${this._config.baseApi}/v1/invite/refuse`, requestHandler(dto))
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public delete(inviteId: string): Observable<void> {
    return this._http
      .delete(`${this._config.baseApi}/v1/invite/${inviteId}`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public create(dto: CreateInviteDto): Observable<Invite> {
    return this._http
      .post(`${this._config.baseApi}/v1/invite`, requestHandler(dto))
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public patch(dto: PatchInviteDto): Observable<Invite> {
    return this._http
      .patch(`${this._config.baseApi}/v1/invite`, requestHandler(dto))
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public get(inviteId: string): Observable<Invite> {
    return this._http.get(`${this._config.baseApi}/v1/invite/${inviteId}`).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(errorHandler(err));
      }),
      map((res) => fetchDataHandler(res))
    );
  }

  public getAll(
    params: GetAllQueryDto
  ): Observable<GetAllResponseDto<GetAllInviteDto>> {
    return this._http
      .get(`${this._config.baseApi}/v1/invite/all`, {
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
