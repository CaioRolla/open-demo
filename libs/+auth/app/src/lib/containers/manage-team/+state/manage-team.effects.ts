import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap, delay, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';

import { ManageTeamFacade } from './manage-team.facade';
import * as ManageTeamActions from './manage-team.actions';
import { Snackbar } from '@demo/shared-app/ui/snackbar';
import { AuthFacade } from '../../../+state/auth-app.facade';
import { InviteService } from '@demo/+auth/app/services';

declare let $localize: any;

@Injectable()
export class ManageTeamEffects {
  public readonly reloadInvites$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ManageTeamActions.reloadInvites),
      concatLatestFrom(() => this._manageTeamFacade.invitesQuery$),
      switchMap(([action, query]) => {
        return this._inviteService.getAll(query!).pipe(
          map((res) => {
            return ManageTeamActions.loadInvitesSuccess({ res });
          }),
          catchError((error) => {
            return of(ManageTeamActions.loadInvitesFailure({ error }));
          })
        );
      })
    );
  });

  public readonly loadInvites$ = createEffect(() => {
    return this._manageTeamFacade.invitesQuery$.pipe(
      filter((query) => !!query),
      switchMap((query) => {
        return this._inviteService.getAll(query!).pipe(
          map((res) => {
            return ManageTeamActions.loadInvitesSuccess({ res });
          }),
          catchError((error) => {
            return of(ManageTeamActions.loadInvitesFailure({ error }));
          })
        );
      })
    );
  });

  public readonly createInvite$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ManageTeamActions.createInvite),
      switchMap((action) => {
        return this._inviteService.create(action.createDto).pipe(
          map((res) => {
            return ManageTeamActions.createInviteSuccess({ res });
          }),
          catchError((error) => {
            return of(ManageTeamActions.createInviteFailure({ error }));
          })
        );
      })
    );
  });

  public readonly createInviteSuccess$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ManageTeamActions.createInviteSuccess),
      tap(() => {
        const message = $localize`Invite sent successfully!`;
        const icon = 'check';
        this._snackbar.open({ icon, message });
      }),
      map(() => ManageTeamActions.reloadInvites())
    );
  });

  public readonly createInviteFailure$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(ManageTeamActions.createInviteFailure),
        tap(() => {
          const message = $localize`Failed to send invite.`;
          const icon = 'x';
          this._snackbar.open({ icon, message });
        })
      );
    },
    { dispatch: false }
  );

  public readonly patchInvite$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ManageTeamActions.patchInvite),
      switchMap((action) => {
        return this._inviteService.patch(action.patchDto).pipe(
          map((res) => {
            return ManageTeamActions.patchInviteSuccess({ res });
          }),
          catchError((error) => {
            return of(ManageTeamActions.patchInviteFailure({ error }));
          })
        );
      })
    );
  });


  public readonly resendInvite$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ManageTeamActions.resendInvite),
      switchMap((action) => {
        return this._inviteService.resend(action.resendDto).pipe(
          map((res) => {
            return ManageTeamActions.resendInviteSuccess({ res });
          }),
          catchError((error) => {
            return of(ManageTeamActions.resendInviteFailure({ error }));
          })
        );
      })
    );
  });

  public readonly patchInviteSuccess$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ManageTeamActions.patchInviteSuccess),
      tap(() => {
        const message = $localize`Invite updated successfully.`;
        const icon = 'check';
        this._snackbar.open({ icon, message });
      }),
      map(() => ManageTeamActions.reloadInvites())
    );
  });

  public readonly resendInviteSuccess$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ManageTeamActions.resendInviteSuccess),
      tap(() => {
        const message = $localize`Invite resent!`;
        const icon = 'check';
        this._snackbar.open({ icon, message });
      }),
      map(() => ManageTeamActions.reloadInvites())
    );
  });

  public readonly resendInviteFailure$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(ManageTeamActions.resendInviteFailure),
        tap(() => {
          const message = $localize`Failed to resend invite.`;
          const icon = 'x';
          this._snackbar.open({ icon, message });
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _router: Router,
    private readonly _authAppFacade: AuthFacade,
    private readonly _manageTeamFacade: ManageTeamFacade,
    private readonly _inviteService: InviteService,
    private readonly _snackbar: Snackbar
  ) {}
}
