import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetAllUserDto, PatchUserDto, User } from '@demo/+auth/core';
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
export class UserService {
  constructor(
    private readonly _http: HttpClient,
    private readonly _config: AuthConfig
  ) {}

  public getAll(
    params: GetAllQueryDto
  ): Observable<GetAllResponseDto<GetAllUserDto>> {
    return this._http
      .get(`${this._config.baseApi}/v1/user/all`, {
        params: handleQuery(params),
      })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public patch(dto: PatchUserDto): Observable<User> {
    return this._http
      .patch(`${this._config.baseApi}/v1/user`, requestHandler(dto))
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }
}
