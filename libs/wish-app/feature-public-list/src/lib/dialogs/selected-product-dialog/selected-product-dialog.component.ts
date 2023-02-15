import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { Dialog, NUI_DIALOG_DATA } from '@demo/shared-app/ui/dialog';
import { Product, SelectProductResponseDto } from '@demo/wish-shared/core';

@Component({
  selector: 'demo-selected-product-dialog',
  templateUrl: './selected-product-dialog.component.html',
  styleUrls: ['./selected-product-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedProductDialogComponent implements OnInit {
  constructor(
    @Inject(NUI_DIALOG_DATA)
    public readonly data: SelectProductResponseDto,
    private readonly _dialog: Dialog
  ) {}

  ngOnInit(): void {}

  public onClose() {
    this._dialog.close();
  }
}
