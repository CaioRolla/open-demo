import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { errorHandler, fetchDataHandler, requestHandler } from '@demo/shared/utils';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DiscussionAppConfig } from '../discussion-app.config';
import { CreateDiscussionCommentDto, GetDiscussionCommentDto, GetDiscussionDto } from '@demo/+discussion/core';

@Injectable()
export class DiscussionCommentService {
  constructor(private readonly _http: HttpClient, private readonly _config: DiscussionAppConfig) {}

  public create(dto: CreateDiscussionCommentDto): Observable<GetDiscussionCommentDto> {
    return this._http.post(`${this._config.baseApi}/v1/discussion-comment`, requestHandler(dto)).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(errorHandler(err));
      }),
      map((res) => fetchDataHandler(res))
    );
  }

  public delete(id: string): Observable<void> {
    return this._http.delete(`${this._config.baseApi}/v1/discussion-comment/${id}`).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(errorHandler(err));
      }),
      map((res) => fetchDataHandler(res))
    );
  }
}
