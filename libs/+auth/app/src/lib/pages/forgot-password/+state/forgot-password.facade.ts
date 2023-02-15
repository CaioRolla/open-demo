import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import * as ForgotPasswordSelectors from './forgot-password.selectors';
import { ForgotPasswordState } from './forgot-password.reducer';
import * as ForgotPasswordActions from './forgot-password.actions';
import { ResendRegisterConfirmationDto } from '@demo/+auth/core';

@Injectable()
export class ForgotPasswordFacade {
  public readonly actions$ = this._actions$.pipe(map((a) => a.type));

  public readonly loading$ = this._store.select(ForgotPasswordSelectors.selectLoading);

  public readonly error$ = this._store.select(ForgotPasswordSelectors.selectError);

  constructor(
    private readonly _store: Store<ForgotPasswordState>,
    private readonly _actions$: Actions
  ) {}

  public resendConfirmation(dto: ResendRegisterConfirmationDto): void {
    this._store.dispatch(ForgotPasswordActions.resendConfirmation({ dto }));
  }
}
