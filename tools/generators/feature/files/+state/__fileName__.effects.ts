import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';


// import { Snackbar } from '@demo/shared-app/ui/snackbar';
import { <%= className %>Facade } from './<%= fileName %>.facade';
import * as <%= className %>Actions from './<%= fileName %>.actions';

@Injectable()
export class <%= className %>Effects {

  // public readonly action$ = createEffect(() => {
  //   return this._actions$.pipe(
  //     ofType(<%= className %>Actions.TODO),
  //     switchMap(action => {
  //       return this._service.create(action.TODO)
  //         .pipe(
  //           map(res => {
  //             return <%= className %>Actions.Success({ res });
  //           }),
  //           catchError(error => {
  //             return of(<%= className %>Actions.Failure({ error }));
  //           })
  //         );
  //     })
  //   );
  // });

  // public readonly action$ = createEffect(() => {
  //   return this._actions$.pipe(
  //     ofType(<%= className %>Actions.TODO),
  //     tap(action => {
  //       const message = $localize`Working late`;
  //       const icon = 'info';
  //       this._snackbar.open({ message, icon });
  //     }),
  //   );
  // }, { dispatch: false });

  constructor(
    private readonly _actions$: Actions,
    private readonly _<%= propertyName %>Facade: <%= className %>Facade,
    // private readonly _snackbar: Snackbar
  ) { }

}
