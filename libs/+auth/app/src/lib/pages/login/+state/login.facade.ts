import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import * as LoginSelectors from './login.selectors';
import { LoginState } from './login.reducer';
import * as LoginActions from './login.actions';
import { LoginDto } from '@demo/+auth/core';

@Injectable()
export class LoginFacade {
  public readonly actions$ = this._actions$.pipe(map((a) => a.type));

  public readonly loading$ = this._store.select(LoginSelectors.selectLoading);

  public readonly error$ = this._store.select(LoginSelectors.selectError);

  constructor(
    private readonly _store: Store<LoginState>,
    private readonly _actions$: Actions
  ) {}

  public login(dto: LoginDto): void {
    this._store.dispatch(LoginActions.login({ dto }));
  }
}
