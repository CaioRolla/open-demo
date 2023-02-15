import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { Asset } from '@demo/+asset/core';
import { debounceTime, distinctUntilChanged, skip, Subscription } from 'rxjs';
import { ManageListFacade } from '../../+state/manage-list.facade';
import _ from 'lodash';

@Component({
  selector: 'demo-appearance-tab',
  templateUrl: './appearance-tab.component.html',
  styleUrls: ['./appearance-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppearanceTabComponent implements OnInit {
  public color = '#fff';

  private readonly _subscriptions = new Subscription();

  public readonly form = this._initForm();

  @Input() listId!: string;

  public readonly patchingList$ = this._manageListFacade.patchingList$;

  public get bannerIdControl() {
    return this.form.controls['bannerId'] as UntypedFormControl;
  }

  public get profileIdControl() {
    return this.form.controls['profileId'] as UntypedFormControl;
  }

  constructor(
    private readonly _manageListFacade: ManageListFacade,
    private readonly _fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this._handleFormPatch();
    this._handleAutoSave();
    this._handlePreviewPatch();
  }

  private _initForm() {
    return this._fb.group({
      background: [],
      borderColor: [],
      color: [],
      profileId: [[]],
      bannerId: [[]],
      themeId: [],
    });
  }

  private _handleAutoSave(): void {
    const sub = this.form.valueChanges
      .pipe(
        // debounceTime(500),
        distinctUntilChanged((a, b) => _.isEqual(a, b)),
        skip(1)
      )
      .subscribe((values) => {
        this._manageListFacade.patchList(
          {
            id: this.listId,
            ...values,
            bannerId: values.bannerId[0] || null,
            profileId: values.profileId[0] || null,
          },
          false
        );
      });
    this._subscriptions.add(sub);
  }

  private _handlePreviewPatch(): void {
    const sub = this.form.valueChanges.subscribe((values) => {
      this._manageListFacade.previewListChanged({
        theme: {
          id: values.themeId,
          borderColor: values.borderColor,
          background: values.background,
          color: values.color,
        },
      });
    });
    this._subscriptions.add(sub);
  }

  private _handleFormPatch(): void {
    const sub = this._manageListFacade.list$.subscribe((list) => {
      if (list) {
        this.form.patchValue(
          {
            background: list.theme.background,
            borderColor: list.theme.borderColor,
            color: list.theme.color,
            profileId: list.profile?.id ? [list.profile?.id] : [],
            bannerId: list.banner?.id ? [list.banner?.id] : [],
          }
        );
      }
    });

    this._subscriptions.add(sub);
  }

  public handleBannerRemoved(): void {
    this._manageListFacade.previewListChanged({
      banner: null,
    });
  }

  public handleProfileRemoved(): void {
    this._manageListFacade.previewListChanged({
      profile: null,
    });
  }

  public handleBannerChange(assets: Asset[]): void {
    if (assets[0]) {
      this._manageListFacade.previewListChanged({
        banner: assets[0],
      });
    }
  }

  public handleProfileChange(assets: Asset[]): void {
    if (assets[0]) {
      this._manageListFacade.previewListChanged({
        profile: assets[0],
      });
    }
  }

  // public onSubmit(): void {
  //   this.form.markAllAsTouched();
  //   this.form.updateValueAndValidity();
  //   if (this.form.valid) {
  //     this._manageListFacade.patchList({
  //       id: this.listId,
  //       ...this.form.value,
  //       bannerId: this.form.value.bannerId[0] || null,
  //       profileId: this.form.value.profileId[0] || null,
  //     });
  //   }
  // }

  // public resetPreview() {
  //   this._manageListFacade.resetPreview();
  // }
}
