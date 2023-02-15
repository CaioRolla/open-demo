import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';

import { BehaviorSubject, filter, Subscription } from 'rxjs';

import { Dialog, NUI_DIALOG_DATA } from '@demo/shared-app/ui/dialog';
import { SaveProductFacade } from '../+state/save-product.facade';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { CustomValidators } from '@demo/shared-app/forms/validators';

@Component({
  selector: 'demo-save-product',
  templateUrl: './save-product.component.html',
  styleUrls: ['./save-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveProductComponent implements OnDestroy, OnInit {
  private readonly _subscriptions = new Subscription();

  public readonly form = this._initForm();

  public readonly product$ = this._saveProductFacade.product$;

  public readonly loadingProduct$ = this._saveProductFacade.loadingProduct$;

  public readonly savingProduct$ = this._saveProductFacade.savingProduct$;

  public readonly loadingProductData$ =
    this._saveProductFacade.loadingProductData$;

  public get personIdControl() {
    return this.form.controls['personId'] as UntypedFormControl;
  }

  public get idControl() {
    return this.form.controls['id'] as UntypedFormControl;
  }

  public get nameControl() {
    return this.form.controls['name'] as UntypedFormControl;
  }

  public get descControl() {
    return this.form.controls['desc'] as UntypedFormControl;
  }

  public get estimatedPriceControl() {
    return this.form.controls['estimatedPrice'] as UntypedFormControl;
  }

  public get urlControl() {
    return this.form.controls['url'] as UntypedFormControl;
  }

  public get imagesIdsControl() {
    return this.form.controls['imagesIds'] as UntypedFormControl;
  }

  public get autoloadEnabledControl() {
    return this.form.controls['autoloadEnabled'] as UntypedFormControl;
  }

  constructor(
    private readonly _saveProductFacade: SaveProductFacade,
    private readonly _dialog: Dialog,
    private readonly _fb: UntypedFormBuilder,
    @Inject(NUI_DIALOG_DATA)
    public readonly data: { listId: string; productId?: string }
  ) {}

  public ngOnInit(): void {
    this._handleFormPatch();

    if (!this.data.productId) {
      this._handleUrlChange();
      this._handleProductDataPatch();
    }

    if (this.data.productId) {
      this._saveProductFacade.loadProduct(this.data.productId);
    }
  }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this._saveProductFacade.resetState();
  }

  private _initForm() {
    return this._fb.group({
      id: [],
      listId: [this.data.listId],
      name: ['', [ Validators.required ]],
      desc: [],
      estimatedPrice: [],
      url: ['', [CustomValidators.URL]],
      imagesIds: [[]],
      personId: [''],
      autoloadEnabled: [true],
    });
  }

  private _handleProductDataPatch(): void {
    const sub = this._saveProductFacade.productData$
      .pipe(filter((v) => !!v))
      .subscribe((data) => {
        if (data?.name) {
          this.nameControl.patchValue(data.name.slice(0, 500));
        }

        if (data?.url) {
          this.urlControl.patchValue(data.url, { emitEvent: false });
        }

        if (data?.desc) {
          this.descControl.patchValue(data.desc.slice(0, 500));
        }

        if (data?.images) {
          this.imagesIdsControl.patchValue(data?.images);
        }

        if (data?.price) {
          this.estimatedPriceControl.patchValue(data.price);
        }
      });
    this._subscriptions.add(sub);
  }

  private _handleUrlChange(): void {
    const sub = this.urlControl.valueChanges.subscribe((url) => {
      const { name, desc } = this.form.value;

      if (
        url &&
        this.urlControl.valid &&
        !name &&
        !desc &&
        this.autoloadEnabledControl.value
      ) {
        this._saveProductFacade.loadProductData(url);
      }
    });

    this._subscriptions.add(sub);
  }

  private _handleFormPatch(): void {
    const sub = this._saveProductFacade.product$.subscribe((product) => {
      if (product && product.id !== this.idControl.value) {
        this.form.patchValue({
          id: product.id,
          name: product.name,
          desc: product.desc,
          estimatedPrice: product.estimatedPrice,
          url: product.url,
          personId: product.person?.id || null,
          imagesIds: product.images.map((i) => i.id),
        });
      }
    });

    this._subscriptions.add(sub);
  }

  public onCancel(): void {
    this._dialog.close();
  }

  public onSubmit(): void {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.valid) {
      this._saveProductFacade.saveProduct({
        ...this.form.value,
        url: this.form.value.url ? this.form.value.url : undefined,
        estimatedPrice: this.form.value.estimatedPrice
          ? Number(this.form.value.estimatedPrice)
          : null,
      });
    }
  }
}
