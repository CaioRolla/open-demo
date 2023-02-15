import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';

import { Subscription } from 'rxjs';

import { DeleteProductFacade } from '../+state/delete-product.facade';
import { Dialog, NUI_DIALOG_DATA } from '@demo/shared-app/ui/dialog';
import { GetAllProductDto } from '@demo/wish-shared/core';

@Component({
  selector: 'demo-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteProductComponent implements OnDestroy, OnInit {
  private readonly _subscriptions = new Subscription();

  public readonly deleting$ = this._deleteProductFacade.deleting$;

  constructor(
    @Inject(NUI_DIALOG_DATA)
    public readonly data: { product: GetAllProductDto },
    private readonly _deleteProductFacade: DeleteProductFacade,
    private readonly _dialog: Dialog
  ) {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this._deleteProductFacade.resetState();
  }

  public onCancel(): void {
    this._dialog.close(false);
  }

  public onSubmit(): void {
    this._deleteProductFacade.deleteProduct(this.data.product.id);
  }
}
