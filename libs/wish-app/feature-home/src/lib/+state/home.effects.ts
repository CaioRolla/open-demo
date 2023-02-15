import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError, tap, filter } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { HomeFacade } from './home.facade';
import * as HomeActions from './home.actions';
import { ListService } from '@demo/wish-app/application/services';

declare let $localize: any;

@Injectable()
export class HomeEffects {
  public readonly loadLists$ = createEffect(() => {
    return this._homeFacade.listsQuery$.pipe(
      filter((query) => !!query),
      switchMap((query) => {
        return this._listService.getAll(query!).pipe(
          map((res) => {
            return HomeActions.loadListsSuccess({ res });
          }),
          catchError((error) => {
            return of(HomeActions.loadListsFailure({ error }));
          })
        );
      })
    );
  });

  constructor(
    private readonly _actions$: Actions,
    private readonly _homeFacade: HomeFacade,
    private readonly _listService: ListService
  ) {}
}
