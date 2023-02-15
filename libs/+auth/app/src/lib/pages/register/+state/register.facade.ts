import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import * as RegisterSelectors from './register.selectors';
import { RegisterState } from './register.reducer';
import * as RegisterActions from './register.actions';
import { RegisterDto } from '@demo/+auth/core';

@Injectable()
export class RegisterFacade {
  public readonly actions$ = this._actions$.pipe(map((a) => a.type));

  public readonly loading$ = this._store.select(RegisterSelectors.selectLoading);

  public readonly error$ = this._store.select(RegisterSelectors.selectError);

  constructor(
    private readonly _store: Store<RegisterState>,
    private readonly _actions$: Actions
  ) {}

  public register(dto: RegisterDto): void {
    this._store.dispatch(RegisterActions.register({ dto }));
  }
}
