import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { concatLatestFrom } from '@ngrx/effects';

import { AuthFacade } from '../+state/auth-app.facade';
import { AuthConfig } from '../auth-app.config';
import { UserStatus } from '@demo/+auth/core';

@Injectable({
  providedIn: 'root',
})
export class UnauthenticatedGuard implements CanActivate {
  constructor(
    private readonly _authAppFacade: AuthFacade,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _config: AuthConfig
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    if (state.root.queryParams['_redirectUrl']) {
      localStorage.setItem(
        `_redirectUrl`,
        state.root.queryParams['_redirectUrl']
      );
    }

    if (state.root.queryParams['ref'] && !localStorage.getItem('ref')) {
      localStorage.setItem(`ref`, state.root.queryParams['ref']);
    }

    if (state.root.queryParams['ref']) {
      this._router.navigate([], {
        relativeTo: this._route,
        queryParams: {
          ...state.root.queryParams,
          ref: undefined,
        },
      });
    }

    if (state.root.queryParams['_token']) {
      this._authAppFacade.setToken(state.root.queryParams['_token']);
      this._router.navigate([], {
        relativeTo: this._route,
        queryParams: {
          _token: undefined,
        },
      });
    }

    return this._authAppFacade.token$.pipe(
      concatLatestFrom(() => this._authAppFacade.user$),
      map(([token, user]) => {
        if (!token || user?.status === UserStatus.PENDING_CONFIRMATION) {
          localStorage.removeItem(`_token`);
          return true;
        }
        return this._router.parseUrl(this._config.signInSuccessRoute ?? '/');
      })
    );
  }
}
