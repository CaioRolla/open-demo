import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import * as ConfirmEmailSelectors from './confirm-email.selectors';
import { ConfirmEmailState } from './confirm-email.reducer';
import * as ConfirmEmailActions from './confirm-email.actions';
import { ResendRegisterConfirmationDto } from '@demo/+auth/core';

@Injectable()
export class ConfirmEmailFacade {
  public readonly actions$ = this._actions$.pipe(map((a) => a.type));

  public readonly loading$ = this._store.select(ConfirmEmailSelectors.selectLoading);

  public readonly error$ = this._store.select(ConfirmEmailSelectors.selectError);

  constructor(
    private readonly _store: Store<ConfirmEmailState>,
    private readonly _actions$: Actions
  ) {}

  public resendConfirmation(dto: ResendRegisterConfirmationDto): void {
    this._store.dispatch(ConfirmEmailActions.resendConfirmation({ dto }));
  }
}
