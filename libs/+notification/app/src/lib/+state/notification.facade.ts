import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { select, Store, Action } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as NotificationActions from './notification.actions';
import { NotificationState } from './notification.reducer';
import * as NotificationSelectors from './notification.selectors';

@Injectable()
export class NotificationFacade {
  public readonly actions$ = this._actions$.pipe(map((a) => a.type));

  public readonly notifications$ = this._store.select(
    NotificationSelectors.selectNotifications
  );

  public readonly notificationsCount$ = this._store.select(
    NotificationSelectors.selectNotificationsCount
  );

  public readonly unviewedNotifications$ = this._store.select(
    NotificationSelectors.selectUnviewedNotifications
  );

  public readonly unviewedNotificationsCount$ = this._store.select(
    NotificationSelectors.selectUnviewedNotificationsCount
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _store: Store<NotificationState>
  ) {}

  public viewedNotifications(): void {
    this._store.dispatch(NotificationActions.viewedNotifications());
  }

  public resetState(): void {
    this._store.dispatch(NotificationActions.resetState());
  }
}
