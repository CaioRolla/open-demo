import { Injectable } from '@angular/core';

import { ComponentStore } from '@ngrx/component-store';
import { tap, delay, catchError, switchMap } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { Snackbar } from '@demo/shared-app/ui/snackbar';
import { Dialog } from '@demo/shared-app/ui/dialog';

export interface <%= className %>State {

  loading: boolean;
  
}


@Injectable()
export class <%= className %>Facade extends ComponentStore<<%= className %>State> {

  public readonly loading$ = this.select(state => state.loading);

  public readonly save = this.effect((params$: Observable<any>) => {
    return params$.pipe(
      tap(() => this.setState((state) => ({ ...state, loading: true }))),

      switchMap((params) => {
        return this._service.delete(params).pipe(
          tap({
            next: (res) => this.setState((state) => ({ ...state, loading: false })),
            error: (error) => this.setState((state) => ({ ...state, loading: false })),
          }),
          tap(() => this._dialog.close(true)),
          delay(300),

          tap(() => {
            const message = $localize`Saved successfully!`;
            const icon = 'check';
            this._snackbar.open({ message, icon });
          }),
          catchError((error) => EMPTY)
        );
      })
    );
  });

  constructor(private readonly _snackbar: Snackbar, private readonly _dialog: Dialog, private readonly _service: Service) {
    super({ loading: false });
  }

}
