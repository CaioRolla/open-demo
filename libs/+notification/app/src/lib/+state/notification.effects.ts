import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import {
  catchError,
  combineLatest,
  debounceTime,
  filter,
  interval,
  map,
  of,
  startWith,
  switchMap,
  takeUntil,
} from 'rxjs';
import { NotificationService } from '../services';
import { AuthFacade } from '@demo/+auth/app';

import * as NotificationActions from './notification.actions';

@Injectable()
export class NotificationEffects {
  public readonly viewedNotifications$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(NotificationActions.viewedNotifications),
      switchMap(() => {
        return this._notificationService.markAsViewed().pipe(
          map(() => {
            return NotificationActions.viewedNotificationsSuccess();
          }),
          catchError((error) => {
            return of(
              NotificationActions.viewedNotificationsFailure({ error })
            );
          })
        );
      })
    );
  });

  public readonly loadNotifications$ = createEffect(() => {
    return this._authFacade.user$.pipe(
      filter((v) => !!v),
      switchMap(() =>
        combineLatest([
          interval(20000).pipe(startWith(null)),
          this._actions$.pipe(
            ofType(NotificationActions.viewedNotificationsSuccess),
            startWith(null)
          ),
        ]).pipe(
          takeUntil(this._authFacade.user$.pipe(filter(user => !user))),
          debounceTime(500),
          switchMap(() => {
            return this._notificationService.getMy().pipe(
              map((notifications) => {
                return NotificationActions.loadNotificationsSuccess({
                  notifications,
                });
              }),
              catchError((error) => {
                return of(
                  NotificationActions.loadNotificationsFailure({ error })
                );
              })
            );
          })
        )
      )
    );
  });

  constructor(
    private readonly _actions$: Actions,
    private readonly _notificationService: NotificationService,
    private readonly _authFacade: AuthFacade
  ) {}
}
