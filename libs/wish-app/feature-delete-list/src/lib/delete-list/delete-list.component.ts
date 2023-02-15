import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';

import { Subscription } from 'rxjs';

import { DeleteListFacade } from '../+state/delete-list.facade';
import { Dialog, NUI_DIALOG_DATA } from '@demo/shared-app/ui/dialog';
import { GetAllListDto } from '@demo/wish-shared/core';

@Component({
  selector: 'demo-delete-list',
  templateUrl: './delete-list.component.html',
  styleUrls: ['./delete-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteListComponent implements OnDestroy, OnInit {
  private readonly _subscriptions = new Subscription();

  public readonly deleting$ =  this._deleteListFacade.deleting$;

  constructor(
    @Inject(NUI_DIALOG_DATA) public readonly data: { list: GetAllListDto },
    private readonly _deleteListFacade: DeleteListFacade,
    private readonly _dialog: Dialog
  ) {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this._deleteListFacade.resetState();
  }

  public onCancel(): void {
    this._dialog.close(false);
  }

  public onSubmit(): void {
    this._deleteListFacade.deleteList(this.data.list.id);
  }
}
