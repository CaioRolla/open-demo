import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import { <%= className %>State } from './<%= fileName %>.reducer';
import * as <%= className %>Selectors from './<%= fileName %>.selectors';
import * as <%= className %>Actions from './<%= fileName %>.actions';

@Injectable()
export class <%= className %>Facade {

  public readonly actions$ = this._actions$.pipe(
    map(a => a.type)
  );

  constructor(
    private readonly _store: Store<<%= className %>State>,
    private readonly _actions$: Actions
  ) { }

  public resetState(): void {
    this._store.dispatch(<%= className %>Actions.resetState());
  }

}
