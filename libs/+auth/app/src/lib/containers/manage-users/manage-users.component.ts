import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { GetAllUserDto, UserBasicPermission, UserStatus } from '@demo/+auth/core';
import { Dialog } from '@demo/shared-app/ui/dialog';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { PermissionsDialogComponent } from '../permissions-dialog/permissions-dialog.component';
import { ManageUsersFacade } from './+state/manage-users.facade';
import { AuthFacade } from '../../+state/auth-app.facade';

@Component({
  selector: 'demo-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageUsersComponent implements OnInit, OnDestroy {
  private readonly _subscriptions = new Subscription();

  public readonly UserBasicPermission = UserBasicPermission;

  public readonly UserStatus = UserStatus;

  public readonly loadingUsers$ = this._manageUsersFacade.loadingUsers$;

  public readonly usersPage$ = this._manageUsersFacade.usersPage$;

  public readonly usersResData$ = this._manageUsersFacade.usersResData$;

  public readonly disableNextUsers$ = this._manageUsersFacade.disableNextUsers$;

  public readonly disablePreviousUsers$ =
    this._manageUsersFacade.disablePreviousUsers$;

  public readonly paginatedUsersCount$ =
    this._manageUsersFacade.paginatedUsersCount$;

  public readonly usersResDataCount$ =
    this._manageUsersFacade.usersResDataCount$;

  public readonly displayEmptyMessage$ =
    this._manageUsersFacade.displayEmptyMessage$;

  public readonly loadingUsersSilently$ =
    this._manageUsersFacade.loadingUsersSilently$;

  public readonly patchingUserId$ = this._manageUsersFacade.patchingUserId$;

  public readonly teamsFeatureEnabled$ = this._authFacade.teamsFeatureEnabled$;

  constructor(
    private readonly _manageUsersFacade: ManageUsersFacade,
    private readonly _authFacade: AuthFacade,
    private readonly _dialog: Dialog
  ) {}
  public ngOnInit(): void {
    this._manageUsersFacade.loadUsers({ take: 5, page: 0 });
  }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this._manageUsersFacade.resetState();
  }

  public nextUsers(): void {
    this._manageUsersFacade.nextUsers();
  }

  public previousUsers(): void {
    this._manageUsersFacade.previousUsers();
  }

  public toggleUserStatus(userId: string, currentStatus: UserStatus): void {
    this._manageUsersFacade.patchUser({
      status:
        currentStatus === UserStatus.DISABLED
          ? UserStatus.ACTIVE
          : UserStatus.DISABLED,
      id: userId,
    });
  }

  public patchPermissionDialog(user: GetAllUserDto): void {
    this._dialog
      .create(PermissionsDialogComponent, {
        data: {
          permissions: user.permissions,
        },
      })
      .afterClosed()
      .subscribe((permissions: string[]) => {
        if (permissions && !_.isEqual(user.permissions, permissions)) {
          this._manageUsersFacade.patchUser({
            id: user.id,
            permissions: permissions,
          });
        }
      });
  }
}
