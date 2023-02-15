import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Dialog } from '@demo/shared-app/ui/dialog';
import { DeleteProductComponent } from '@demo/wish-app/feature-delete-product';
import { PlatformProductCloneComponent } from '@demo/wish-app/feature-platform-product-clone';
import { SaveProductComponent } from '@demo/wish-app/feature-save-product';
import { GetAllProductDto } from '@demo/wish-shared/core';
import { debounceTime, Subscription } from 'rxjs';
import { ManageListFacade } from '../../+state/manage-list.facade';

@Component({
  selector: 'demo-products-tab',
  templateUrl: './products-tab.component.html',
  styleUrls: ['./products-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsTabComponent implements OnInit {
  private readonly _subscriptions = new Subscription();
  @Input() listId!: string;

  public readonly searchControl = new FormControl('');

  public readonly loadingProducts$ = this._manageListFacade.loadingProducts$;

  public readonly filteredProducts$ = this._manageListFacade.filteredProducts$;

  public readonly filteredProductsCount$ =
    this._manageListFacade.filteredProductsCount$;

  public readonly productsSearchQuery$ =
    this._manageListFacade.productsSearchQuery$;

  public readonly displayEmptyMessage$ =
    this._manageListFacade.displayEmptyMessage$;

  constructor(
    private readonly _manageListFacade: ManageListFacade,
    private readonly _dialog: Dialog
  ) {}

  ngOnInit(): void {
    this._manageListFacade.loadProducts(this.listId);

    this._patchSearchControl();
    this._patchSearchState();
  }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  private _patchSearchControl(): void {
    const sub = this._manageListFacade.productsSearchQuery$.subscribe((query) =>
      this.searchControl.patchValue(query, { emitEvent: false })
    );
    this._subscriptions.add(sub);
  }

  private _patchSearchState(): void {
    const sub = this.searchControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((query) =>
        this._manageListFacade.setProductsSearchQuery(query)
      );
    this._subscriptions.add(sub);
  }

  public onCancel(): void {
    this._dialog.close();
  }

  public createProductClicked(): void {
    this._dialog
      .create(SaveProductComponent, {
        data: {
          listId: this.listId,
        },
      })
      .afterClosed()
      .subscribe((reload) => {
        if (reload) {
          this._manageListFacade.loadProducts(this.listId);
        }
      });
  }

  public recommendedProductClicked(): void {
    this._dialog
      .create(PlatformProductCloneComponent, {
        data: {
          listId: this.listId,
        },
      })
      .afterClosed()
      .subscribe((reload) => {
        if (reload) {
          this._manageListFacade.loadProducts(this.listId);
        }
      });
  }

  public editProductClicked(productId: string): void {
    this._dialog
      .create(SaveProductComponent, {
        data: {
          listId: this.listId,
          productId,
        },
      })
      .afterClosed()
      .subscribe((reload) => {
        if (reload) {
          this._manageListFacade.loadProducts(this.listId);
        }
      });
  }

  public deleteProductClicked(product: GetAllProductDto): void {
    this._dialog
      .create(DeleteProductComponent, {
        data: {
          listId: this.listId,
          product,
        },
      })
      .afterClosed()
      .subscribe((reload) => {
        if (reload) {
          this._manageListFacade.loadProducts(this.listId);
        }
      });
  }

  public trackByProductId(index: number, data: { id: string }): string {
    return data.id;
  }
}
