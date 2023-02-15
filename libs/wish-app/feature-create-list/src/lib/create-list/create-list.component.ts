import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { CreateListFacade } from '../+state/create-list.facade';
import { Dialog } from '@demo/shared-app/ui/dialog';

@Component({
  selector: 'demo-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateListComponent implements OnDestroy, OnInit {
  private readonly _subscriptions = new Subscription();

  public readonly form = this._initForm();

  public get nameControl() {
    return this.form.controls['name'] as UntypedFormControl;
  }

  public get descControl() {
    return this.form.controls['desc'] as UntypedFormControl;
  }

  public readonly creatingList$ = this._createListFacade.creatingList$;

  constructor(
    private readonly _dialog: Dialog,
    private readonly _fb: UntypedFormBuilder,
    private readonly _createListFacade: CreateListFacade
  ) {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this._createListFacade.resetState();
  }

  public onCancel() {
    this._dialog.close();
  }

  private _initForm() {
    return this._fb.group({
      name: ['', [Validators.required]],
      desc: [''],
    });
  }

  public onSubmit(): void {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    if (this.form.valid) {
      this._createListFacade.createList(this.form.value);
    }
  }
}
