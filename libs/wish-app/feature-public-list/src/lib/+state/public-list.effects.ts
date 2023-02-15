import { Injectable } from '@angular/core';

import { combineLatest, of, pipe } from 'rxjs';
import {
  switchMap,
  map,
  catchError,
  tap,
  filter,
  debounceTime,
  take,
} from 'rxjs/operators';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';

import { PublicListFacade } from './public-list.facade';
import * as PublicListActions from './public-list.actions';
import {
  ListService,
  ProductService,
} from '@demo/wish-app/application/services';
import { Dialog } from '@demo/shared-app/ui/dialog';
import { NewPersonDialogComponent } from '../dialogs/new-person-dialog/new-person-dialog.component';
import { SelectedProductDialogComponent } from '../dialogs/selected-product-dialog/selected-product-dialog.component';
import { Snackbar } from '@demo/shared-app/ui/snackbar';

declare let $localize: any;

@Injectable()
export class PublicListEffects {
  public readonly loadList$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(PublicListActions.loadList),
      switchMap((action) => {
        return this._listService.public(action.listSlug).pipe(
          map((res) => {
            return PublicListActions.loadListSuccess({ res });
          }),
          catchError((error) => {
            return of(PublicListActions.loadListFailure({ error }));
          })
        );
      })
    );
  });

  public readonly setPerson$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(PublicListActions.setPerson),
        tap((action) => {
          localStorage.setItem('_personName', action.name);
          localStorage.setItem('_personEmail', action.email);
        }),
        tap(() => this._dialog.close())
      );
    },
    { dispatch: false }
  );

  public readonly newPersonDialog$ = createEffect(
    () => {
      return combineLatest([
        this._publicListFacade.personName$,
        this._publicListFacade.personEmail$,
      ]).pipe(
        debounceTime(200),
        filter(([personName, personEmail]) => !personName || !personEmail),
        tap(() => {
          this._dialog.create(NewPersonDialogComponent, { disableClose: true });
        })
      );
    },
    { dispatch: false }
  );

  public readonly selectProduct$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(PublicListActions.selectProduct),
      concatLatestFrom(() => [
        this._publicListFacade.personName$,
        this._publicListFacade.personEmail$,
      ]),
      switchMap(([action, personName, personEmail]) => {
        return this._productService
          .select({
            productId: action.productId,
            personName,
            personEmail,
          } as any)
          .pipe(
            map((res) => {
              return PublicListActions.selectProductSuccess({ res });
            }),
            catchError((error) => {
              return of(PublicListActions.selectProductFailure({ error }));
            })
          );
      })
    );
  });

  public readonly selectProductSuccess$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(PublicListActions.selectProductSuccess),
        tap((action) => {
          this._dialog.create(SelectedProductDialogComponent, {
            data: action.res,
          });
        })
      );
    },
    { dispatch: false }
  );

  public readonly selectProductFailure$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(PublicListActions.selectProductFailure),
        tap(() => {
          const message = $localize`Failed to select product. Try again or select another.`;
          const icon = 'x';
          this._snackbar.open({ message, icon });
        })
      );
    },
    { dispatch: false }
  );

  public readonly unselectProduct$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(PublicListActions.unselectProduct),
      concatLatestFrom(() => [this._publicListFacade.personEmail$]),
      switchMap(([action, personEmail]) => {
        return this._productService
          .unselect({
            productId: action.productId,
            personEmail,
          } as any)
          .pipe(
            map((res) => {
              return PublicListActions.unselectProductSuccess({
                productId: action.productId,
              });
            }),
            catchError((error) => {
              return of(PublicListActions.unselectProductFailure({ error }));
            })
          );
      })
    );
  });

  public readonly unselectProductSuccess$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(PublicListActions.unselectProductSuccess),
        tap(() => {
          const message = $localize`Product unselected successfully.`;
          const icon = 'check';
          this._snackbar.open({ message, icon });
        })
      );
    },
    { dispatch: false }
  );

  public readonly unselectProductFailure$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(PublicListActions.selectProductFailure),
        tap(() => {
          const message = $localize`Failed to unselect product. Try again or contact the list owner.`;
          const icon = 'x';
          this._snackbar.open({ message, icon });
        })
      );
    },
    { dispatch: false }
  );

  // public readonly createVisitEvent$ = createEffect(() => {
  //   return combineLatest([
  //     this._publicListFacade.list$,
  //     this._publicListFacade.personName$,
  //     this._publicListFacade.personEmail$,
  //   ]).pipe(
  //     debounceTime(500),
  //     filter(
  //       ([list, personName, personEmail]) =>
  //         !!list && !!personName && !!personEmail
  //     ),
  //     take(1),
  //     switchMap(([list, personName, personEmail]) => {
  //       return this._eventService
  //         .create({
  //           name: LIST_VISITED_EVENT_NAME,
  //           data: {
  //             listId: list?.id,
  //             personName,
  //             personEmail,
  //           },
  //         })
  //         .pipe(
  //           map((res) => {
  //             return { type: 'NO_ACTION' };
  //           }),
  //           catchError((error) => {
  //             return of({ type: 'NO_ACTION' });
  //           })
  //         );
  //     })
  //   );
  // });

  constructor(
    private readonly _actions$: Actions,
    private readonly _listService: ListService,
    private readonly _productService: ProductService,
    private readonly _dialog: Dialog,
    private readonly _publicListFacade: PublicListFacade,
    private readonly _snackbar: Snackbar
  ) {}
}
