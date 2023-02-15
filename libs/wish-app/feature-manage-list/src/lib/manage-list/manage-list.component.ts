import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Snackbar } from '@demo/shared-app/ui/snackbar';
import { List } from '@demo/wish-shared/core';

import { filter, map, Subscription, take } from 'rxjs';

import { ManageListFacade } from '../+state/manage-list.facade';

declare let $localize: any;

@Component({
  selector: 'demo-manage-list',
  templateUrl: './manage-list.component.html',
  styleUrls: ['./manage-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageListComponent implements OnDestroy, OnInit {
  private readonly _subscriptions = new Subscription();

  public readonly listId = this._route.snapshot.params['listId'];

  public readonly list$ = this._manageListFacade.list$;

  public readonly navigatorShare = !!navigator.share;

  public readonly listUrl$ = this.list$.pipe(
    filter((v) => !!v),
    map((list) => {
      return list?.shortUrl || `https://app.listaideal.com.br/${list?.slug}`;
    })
  );

  public readonly previewList$ = this._manageListFacade.previewList$;

  public readonly products$ = this._manageListFacade.products$;

  public readonly previewProducts$ = this._manageListFacade.previewProducts$;

  constructor(
    private readonly _manageListFacade: ManageListFacade,
    private readonly _route: ActivatedRoute,
    private readonly _snackbar: Snackbar
  ) {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this._manageListFacade.resetState();
  }

  public copiedToClipboard(): void {
    this._snackbar.open({
      message: $localize`List URL copied to Clipboard!`,
      icon: 'clipboard',
    });
  }

  public async onShareClicked(list: List) {
    try {
      await navigator.share({
        url: list.shortUrl || `https://app.listaideal.com.br/${list.slug}`,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
