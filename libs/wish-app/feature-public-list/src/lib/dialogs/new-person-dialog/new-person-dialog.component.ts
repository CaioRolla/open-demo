import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { PublicListFacade } from '../../+state/public-list.facade';

@Component({
  selector: 'demo-new-person-dialog',
  templateUrl: './new-person-dialog.component.html',
  styleUrls: ['./new-person-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPersonDialogComponent implements OnInit {
  public readonly form = this._initForm();

  public readonly list$ = this._publicListFacade.list$;

  get nameControl() {
    return this.form.get('name') as UntypedFormControl;
  }

  get emailControl() {
    return this.form.get('email') as UntypedFormControl;
  }

  constructor(
    private readonly _publicListFacade: PublicListFacade,
    private readonly _fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {}

  private _initForm() {
    return this._fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public onSubmit(): void {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    if (this.form.valid) {
      const value = this.form.value;
      this._publicListFacade.setPerson(value.name, value.email);
    }
  }
}
