import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { take, map, switchMap, catchError } from 'rxjs/operators';

import { AuthFacade } from '../+state/auth-app.facade';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private _authAppFacade: AuthFacade) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this._authAppFacade.token$.pipe(
      take(1),
      map((token) => {
        
        return request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
            ref: localStorage.getItem('ref') || '',
            ['admin-account-id-access']: localStorage.getItem('_adminAccountIdAccess') || ''
          },
        });
      }),
      switchMap((req) => {
        return next.handle(req).pipe(
          catchError((error: HttpErrorResponse) => {

            if(error.status === 401){
              this._authAppFacade.logout();
            }
            
            return throwError(error);
          })
        );
      })
    );
  }
}
