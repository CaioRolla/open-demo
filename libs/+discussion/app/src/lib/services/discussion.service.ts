import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { errorHandler, fetchDataHandler, requestHandler } from '@demo/shared/utils';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DiscussionAppConfig } from '../discussion-app.config';
import { GetDiscussionDto } from '@demo/+discussion/core';

@Injectable()
export class DiscussionService {
  constructor(private readonly _http: HttpClient, private readonly _config: DiscussionAppConfig) {}

  public get(identifier: string): Observable<GetDiscussionDto> {
    return this._http.get(`${this._config.baseApi}/v1/discussion/${identifier}`).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(errorHandler(err));
      }),
      map((res) => fetchDataHandler(res))
    );
  }
}
