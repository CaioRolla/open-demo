import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import * as ForgotPasswordEmailSelectors from './forgot-password-email.selectors';
import { ForgotPasswordEmailState } from './forgot-password-email.reducer';
import * as ForgotPasswordEmailActions from './forgot-password-email.actions';
import { ResendRegisterConfirmationDto } from '@demo/+auth/core';

@Injectable()
export class ForgotPasswordEmailFacade {
  public readonly actions$ = this._actions$.pipe(map((a) => a.type));

  public readonly loading$ = this._store.select(ForgotPasswordEmailSelectors.selectLoading);

  public readonly error$ = this._store.select(ForgotPasswordEmailSelectors.selectError);

  constructor(
    private readonly _store: Store<ForgotPasswordEmailState>,
    private readonly _actions$: Actions
  ) {}

  public resendConfirmation(dto: ResendRegisterConfirmationDto): void {
    this._store.dispatch(ForgotPasswordEmailActions.resendConfirmation({ dto }));
  }
}
