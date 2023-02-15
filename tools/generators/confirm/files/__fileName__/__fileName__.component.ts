import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, Inject } from '@angular/core';

import { Dialog, NUI_DIALOG_DATA } from '@demo/shared-app/ui/dialog';
import { ConfirmationDialogButtonTheme } from '@demo/shared-app/ui/confirmation-dialog';
import { <%= className %>Facade } from '../+state/<%= fileName %>.facade';

@Component({
  selector: 'demo-<%= fileName %>',
  templateUrl: './<%= fileName %>.component.html',
  styleUrls: ['./<%= fileName %>.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class <%= className %>Component {

  public readonly titleText = $localize`Confirm`;
  public readonly confirmText = $localize`Are you sure?`;
  public readonly confirmButtonText = $localize`Confirm`;
  public readonly confirmationButtonTheme = ConfirmationDialogButtonTheme.PRIMARY;


  public readonly loading$ = this._<%= propertyName %>Facade.loading$

  constructor(
    @Inject(NUI_DIALOG_DATA)  public readonly data: {  },
    private readonly _dialog: Dialog,
    private readonly _<%= propertyName %>Facade: <%= className %>Facade
  ){ }

  public onConfirm(confirmed: boolean): void {
    if(confirmed){
      this._<%= propertyName %>Facade.save();
    } else {
      this._dialog.close(false);
    }
  }

}
