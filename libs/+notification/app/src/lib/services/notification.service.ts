import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notification } from '@demo/+notification/core';
import {
  errorHandler,
  fetchDataHandler,
  requestHandler,
} from '@demo/shared/utils';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NotificationAppConfig } from '../notification-app.config';

@Injectable()
export class NotificationService {
  constructor(
    private readonly _http: HttpClient,
    private readonly _config: NotificationAppConfig
  ) {}

  public markAsViewed(): Observable<void> {
    return this._http.patch(`${this._config.baseApi}/v1/notification/mark-as-viewed`, { }).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(errorHandler(err));
      }),
      map((res) => fetchDataHandler(res))
    );
  }

  public getMy(): Observable<Notification[]> {
    return this._http.get(`${this._config.baseApi}/v1/notification/my`).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(errorHandler(err));
      }),
      map((res) => fetchDataHandler(res))
    );
  }
}
