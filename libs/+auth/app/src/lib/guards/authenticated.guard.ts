import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { concatLatestFrom } from '@ngrx/effects';
import { UserStatus } from '@demo/+auth/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthFacade } from '../+state/auth-app.facade';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard implements CanActivate {
  constructor(
    private readonly _authAppFacade: AuthFacade,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    if (state.root.queryParams['_redirectUrl']) {
      localStorage.setItem(`_redirectUrl`, state.root.queryParams['_redirectUrl']);
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

    if (state.root.queryParams['_adminAccountIdAccess']) {
      localStorage.setItem(`_adminAccountIdAccess`, state.root.queryParams['_adminAccountIdAccess']);
      this._router.navigate([], {
        relativeTo: this._route,
        queryParams: {
          _adminAccountIdAccess: undefined,
        },
      });
    }

    const permission = next.data['permission'];
    const fallbackRoute = next.data['fallbackRoute'];

    return this._authAppFacade.token$.pipe(
      concatLatestFrom(() => this._authAppFacade.user$),
      map(([token, user]) => {
        if (user?.status === UserStatus.PENDING_CONFIRMATION) {
          localStorage.removeItem(`_token`);
          return this._router.parseUrl(`/auth/confirm-email/${user.email}`);
        }

        if (permission && !user?.permissions.includes(permission)) {
          if (fallbackRoute) {
            return this._router.parseUrl(fallbackRoute);
          }

          return this._router.parseUrl(`/`);
        }

        const redirectUrl = localStorage.getItem(`_redirectUrl`);

        if (token && redirectUrl) {
          localStorage.removeItem(`_redirectUrl`);
          window.location.href = redirectUrl;
        }

        if (token) return true;

        return this._router.parseUrl('/auth/sign-in');
      })
    );
  }
}
