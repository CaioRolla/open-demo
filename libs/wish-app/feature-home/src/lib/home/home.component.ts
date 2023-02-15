import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Subscription } from 'rxjs';

import { HomeFacade } from '../+state/home.facade';
import { CreateListComponent } from '@demo/wish-app/feature-create-list';
import { Dialog } from '@demo/shared-app/ui/dialog';
import { GetAllListDto, ListStatus } from '@demo/wish-shared/core';
import { DeleteListComponent } from '@demo/wish-app/feature-delete-list';

@Component({
  selector: 'demo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnDestroy, OnInit {
  private readonly _subscriptions = new Subscription();

  public readonly ListStatus = ListStatus;

  public readonly loadingLists$ = this._homeFacade.loadingLists$;

  public readonly listsPage$ = this._homeFacade.listsPage$;

  public readonly listsResData$ = this._homeFacade.listsResData$;

  public readonly disableNextLists$ = this._homeFacade.disableNextLists$;

  public readonly disablePreviousLists$ =
    this._homeFacade.disablePreviousLists$;

  public readonly paginatedListsCount$ = this._homeFacade.paginatedListsCount$;

  public readonly listsResDataCount$ = this._homeFacade.listsResDataCount$;

  public readonly displayEmptyMessage$ = this._homeFacade.displayEmptyMessage$;

  public readonly loadingListsSilently$ =
    this._homeFacade.loadingListsSilently$;

  constructor(
    private readonly _dialog: Dialog,
    private readonly _homeFacade: HomeFacade
  ) {}

  public ngOnInit(): void {
    this._homeFacade.loadLists({ take: 5, page: 0 });
  }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this._homeFacade.resetState();
  }

  public createListClicked(): void {
    this._dialog.create(CreateListComponent);
  }

  public nextLists(): void {
    this._homeFacade.nextLists();
  }

  public previousLists(): void {
    this._homeFacade.previousLists();
  }

  public deleteListClicked(list: GetAllListDto): void {
    this._dialog
      .create(DeleteListComponent, {
        data: { list },
      })
      .afterClosed()
      .subscribe((reload) => {
        if (reload) {
          this._homeFacade.loadLists({ take: 5, page: 0 });
        }
      });
  }
}
