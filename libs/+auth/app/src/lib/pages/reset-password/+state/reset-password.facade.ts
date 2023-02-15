import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import * as ResetPasswordSelectors from './reset-password.selectors';
import { ResetPasswordState } from './reset-password.reducer';
import * as ResetPasswordActions from './reset-password.actions';
import { ResetPasswordDto } from '@demo/+auth/core';

@Injectable()
export class ResetPasswordFacade {
  public readonly actions$ = this._actions$.pipe(map((a) => a.type));

  public readonly loading$ = this._store.select(ResetPasswordSelectors.selectLoading);

  public readonly error$ = this._store.select(ResetPasswordSelectors.selectError);

  constructor(
    private readonly _store: Store<ResetPasswordState>,
    private readonly _actions$: Actions
  ) {}

  public reset(dto: ResetPasswordDto): void {
    this._store.dispatch(ResetPasswordActions.reset({ dto }));
  }
}
