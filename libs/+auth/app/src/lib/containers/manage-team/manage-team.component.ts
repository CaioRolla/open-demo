import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import * as _ from 'lodash';
import { GetAllInviteDto, InviteStatus, UserBasicPermission } from '@demo/+auth/core';
import {
  handleErrorControl,
  handleResetControl,
} from '@demo/shared-app/utils/handlers';
import { Subscription } from 'rxjs';
import { ManageTeamFacade } from './+state/manage-team.facade';
import { Dialog } from '@demo/shared-app/ui/dialog';
import { PermissionsDialogComponent } from '../permissions-dialog/permissions-dialog.component';
import { ManageTeamAction } from './+state/manage-team.actions';
import { AuthFacade } from '../../+state/auth-app.facade';

@Component({
  selector: 'demo-manage-team',
  templateUrl: './manage-team.component.html',
  styleUrls: ['./manage-team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageTeamComponent implements OnInit, OnDestroy {
  private readonly _subscriptions = new Subscription();

  public readonly UserBasicPermission = UserBasicPermission;

  public readonly form = this._initForm();

  public readonly InviteStatus = InviteStatus;

  public readonly loadingInvites$ = this._manageTeamFacade.loadingInvites$;

  public readonly invitesPage$ = this._manageTeamFacade.invitesPage$;

  public readonly invitesResData$ = this._manageTeamFacade.invitesResData$;

  public readonly disableNextInvites$ =
    this._manageTeamFacade.disableNextInvites$;

  public readonly disablePreviousInvites$ =
    this._manageTeamFacade.disablePreviousInvites$;

  public readonly paginatedInvitesCount$ =
    this._manageTeamFacade.paginatedInvitesCount$;

  public readonly invitesResDataCount$ =
    this._manageTeamFacade.invitesResDataCount$;

  public readonly displayEmptyMessage$ =
    this._manageTeamFacade.displayEmptyMessage$;

  public readonly loadingInvitesSilently$ =
    this._manageTeamFacade.loadingInvitesSilently$;

  public readonly createInviteError$ =
    this._manageTeamFacade.createInviteError$;

  public readonly creatingInvite$ = this._manageTeamFacade.creatingInvite$;

  public readonly patchingInviteId$ = this._manageTeamFacade.patchingInviteId$;

  public readonly resendingInviteId$ =
    this._manageTeamFacade.resendingInviteId$;

  public readonly teamsFeatureEnabled$ = this._authFacade.teamsFeatureEnabled$;

  get emailControl() {
    return this.form.get('email') as FormControl;
  }

  get permissionsControl() {
    return this.form.get('permissions') as FormControl;
  }

  constructor(
    private readonly _manageTeamFacade: ManageTeamFacade,
    private readonly _authFacade: AuthFacade,
    private readonly _fb: UntypedFormBuilder,
    private readonly _dialog: Dialog
  ) {}

  private _initForm() {
    return this._fb.group({
      email: ['', [Validators.email, Validators.required]],
      permissions: [[]],
    });
  }

  public ngOnInit(): void {
    this._manageTeamFacade.loadInvites({ take: 5, page: 0 });

    handleResetControl(
      ManageTeamAction.CREATE_INVITE_SUCCESS,
      this.form,
      this._manageTeamFacade.actions$,
      this._subscriptions
    );

    handleErrorControl(
      this.emailControl,
      this.createInviteError$,
      this._subscriptions
    );
  }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this._manageTeamFacade.resetState();
  }

  public nextInvites(): void {
    this._manageTeamFacade.nextInvites();
  }

  public previousInvites(): void {
    this._manageTeamFacade.previousInvites();
  }

  public onSubmit(): void {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    if (this.form.valid) {
      this._manageTeamFacade.createInvite(this.form.value);
    }
  }

  public cancelInvite(inviteId: string): void {
    this._manageTeamFacade.patchInvite({
      status: InviteStatus.CANCELED,
      id: inviteId,
    });
  }

  public resendInvite(inviteId: string): void {
    this._manageTeamFacade.resendInvite({
      id: inviteId,
    });
  }

  public addPermissionDialog(): void {
    this._dialog
      .create(PermissionsDialogComponent, {
        data: {
          permissions: this.permissionsControl.value || [],
        },
      })
      .afterClosed()
      .subscribe((permissions?: string[]) => {
        if (permissions) {
          this.permissionsControl.setValue(permissions);
        }
      });
  }

  public patchPermissionDialog(invite: GetAllInviteDto): void {
    this._dialog
      .create(PermissionsDialogComponent, {
        data: {
          permissions: invite.permissions,
        },
      })
      .afterClosed()
      .subscribe((permissions: string[]) => {
        if (permissions && !_.isEqual(invite.permissions, permissions)) {
          this._manageTeamFacade.patchInvite({
            id: invite.id,
            permissions: permissions,
          });
        }
      });
  }
}
