import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { IDatePickerDirectiveConfig } from 'ng2-date-picker';
import moment from 'moment';
import { Subscription } from 'rxjs';

import { ManageListFacade } from '../../+state/manage-list.facade';

@Component({
  selector: 'demo-settings-tab',
  templateUrl: './settings-tab.component.html',
  styleUrls: ['./settings-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsTabComponent implements OnInit {
  private readonly _subscriptions = new Subscription();

  public readonly form = this._initForm();

  @Input() listId!: string;

  public readonly patchingList$ = this._manageListFacade.patchingList$;

  public get nameControl() {
    return this.form.controls['name'] as UntypedFormControl;
  }

  public get descControl() {
    return this.form.controls['desc'] as UntypedFormControl;
  }

  public get eventLocationControl() {
    return this.form.controls['eventLocation'] as UntypedFormControl;
  }

  public get eventDateControl() {
    return this.form.controls['eventDate'] as UntypedFormControl;
  }

  public get pixControl() {
    return this.form.controls['pix'] as UntypedFormControl;
  }

  constructor(
    private readonly _manageListFacade: ManageListFacade,
    private readonly _fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this._handleFormPatch();
    this._handlePreviewPatch();
  }

  private _initForm() {
    return this._fb.group({
      name: [],
      desc: [],
      eventLocation: [],
      eventDate: [],
      pix: [],
    });
  }

  private _handlePreviewPatch(): void {
    const sub = this.form.valueChanges.subscribe((values) => {
      this._manageListFacade.previewListChanged({
        ...values,
        eventDate: values.eventDate ? new Date(values.eventDate) : null,
      });
    });
    this._subscriptions.add(sub);
  }

  private _handleFormPatch(): void {
    const sub = this._manageListFacade.list$.subscribe((list) => {
      if (list) {

        const eventDateFn = () => {
          const tzoffset = (new Date()).getTimezoneOffset() * 60000;
          const localISOTime = (new Date(new Date(list.eventDate || '').getTime() - tzoffset)).toISOString().slice(0, -1);

          return localISOTime.slice(0,16);
        }

        this.form.patchValue({
          name: list.name,
          desc: list.desc,
          pix: list.pix,
          eventLocation: list.eventLocation,
          eventDate: list.eventDate ? eventDateFn() : null,
        });
      }
    });

    this._subscriptions.add(sub);
  }

  public onSubmit(): void {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    if (this.form.valid) {
      this._manageListFacade.patchList({
        id: this.listId,
        ...this.form.value,
        pix: this.form.value.pix || null,
        eventDate: this.form.value.eventDate
          ? new Date(this.form.value.eventDate)
          : null,
      });
    }
  }
}
