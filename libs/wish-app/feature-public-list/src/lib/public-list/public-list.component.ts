import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dialog, NUI_DIALOG_DATA } from '@demo/shared-app/ui/dialog';
import { GetPublicListDto, Product } from '@demo/wish-shared/core';

import { Subscription } from 'rxjs';

import { PublicListFacade } from '../+state/public-list.facade';
import { PixDialogComponent } from '../dialogs/pix-dialog/pix-dialog.component';

@Component({
  selector: 'demo-public-list',
  templateUrl: './public-list.component.html',
  styleUrls: ['./public-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicListComponent implements OnDestroy, OnInit {
  private readonly _subscriptions = new Subscription();

  public readonly listSlug = this._route.snapshot.params['listSlug'];

  public readonly list$ = this._publicListFacade.list$;

  public readonly personEmail$ = this._publicListFacade.personEmail$;

  public readonly selectingProductId$ =
    this._publicListFacade.selectingProductId$;

  constructor(
    private readonly _publicListFacade: PublicListFacade,
    private readonly _route: ActivatedRoute,
    private readonly _dialog: Dialog,
  ) {}

  public ngOnInit(): void {
    
  }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this._publicListFacade.resetState();
  }

  public selectProduct(productId: string) {
    this._publicListFacade.selectProduct(productId);
  }

  public unselectProduct(productId: string) {
    this._publicListFacade.unselectProduct(productId);
  }

  public pixClicked(list: GetPublicListDto) {
    this._dialog.create(PixDialogComponent, {
      data: { list },
    });
  }

  
}
