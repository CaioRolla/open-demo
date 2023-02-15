import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import { FormControl, UntypedFormControl } from '@angular/forms';
import { Dialog, NUI_DIALOG_DATA } from '@demo/shared-app/ui/dialog';

import {
  combineLatest,
  debounceTime,
  map,
  startWith,
  Subscription,
} from 'rxjs';

import { PlatformProductCloneFacade } from '../+state/platform-product-clone.facade';

@Component({
  selector: 'demo-platform-product-clone',
  templateUrl: './platform-product-clone.component.html',
  styleUrls: ['./platform-product-clone.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlatformProductCloneComponent implements OnDestroy, OnInit {
  private readonly _subscriptions = new Subscription();

  public readonly searchControl = new FormControl('');

  public readonly selectControl = new UntypedFormControl([]);

  public readonly loadingProducts$ =
    this._platformProductCloneFacade.loadingProducts$;

  public readonly productsSearchQuery$ =
    this._platformProductCloneFacade.productsSearchQuery$;

  public readonly filteredProducts$ =
    this._platformProductCloneFacade.filteredProducts$;

  public readonly displayEmptyMessage$ =
    this._platformProductCloneFacade.displayEmptyMessage$;

  public readonly filteredProductsCount$ =
    this._platformProductCloneFacade.filteredProductsCount$;

    public readonly cloningProducts$=
    this._platformProductCloneFacade.cloningProducts$;

  public readonly options$ = combineLatest([
    this.filteredProducts$,
    this.selectControl.valueChanges.pipe(startWith(this.selectControl.value)),
  ]).pipe(
    map(([products, selected]) => {
      return products.map((product) => {
        return {
          ...product,
          checked: selected?.includes(product.id) || false,
        };
      });
    })
  );

  constructor(
    private readonly _dialog: Dialog,
    @Inject(NUI_DIALOG_DATA)
    public readonly data: { listId: string },
    private readonly _platformProductCloneFacade: PlatformProductCloneFacade
  ) {}

  public ngOnInit(): void {
    this._platformProductCloneFacade.loadPlatformProducts(this.data.listId);
    this._patchSearchControl();
    this._patchSearchState();
  }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this._platformProductCloneFacade.resetState();
  }

  private _patchSearchControl(): void {
    const sub = this._platformProductCloneFacade.productsSearchQuery$.subscribe(
      (query) => this.searchControl.patchValue(query, { emitEvent: false })
    );
    this._subscriptions.add(sub);
  }

  private _patchSearchState(): void {
    const sub = this.searchControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((query) =>
        this._platformProductCloneFacade.setProductsSearchQuery(query)
      );
    this._subscriptions.add(sub);
  }

  public productSelectToggle(productId: string, checked: boolean) {

    const ids = this.selectControl.value.filter((id: string) => id !== productId);

    if (checked) {
      this.selectControl.patchValue([...ids, productId]);
    }
  }

  public trackByProductId(index: number, data: { id: string }): string {
    return data.id;
  }

  public onCancel(): void {
    this._dialog.close(false);
  }

  public onSubmit(): void {
    this._platformProductCloneFacade.cloneProducts(this.selectControl.value);
  }
}
