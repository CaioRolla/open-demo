import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';

import { Snackbar } from '@demo/shared-app/ui/snackbar';
import { Dialog, NUI_DIALOG_DATA } from '@demo/shared-app/ui/dialog';
import { GetPublicListDto } from '@demo/wish-shared/core';

declare let $localize: any;

const copySuccessMessage = $localize`Copied PIX code to Clipboard`;

@Component({
  selector: 'demo-pix-dialog',
  templateUrl: './pix-dialog.component.html',
  styleUrls: ['./pix-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PixDialogComponent implements OnInit {
  constructor(
    @Inject(NUI_DIALOG_DATA) public data: { list: GetPublicListDto },
    private readonly _dialog: Dialog,
    private readonly _snackbar: Snackbar
  ) {}

  ngOnInit(): void {}
  public copiedToClipboard(): void {
    this._snackbar.open({
      message: copySuccessMessage,
      icon: 'clipboard'
    });
  }
}