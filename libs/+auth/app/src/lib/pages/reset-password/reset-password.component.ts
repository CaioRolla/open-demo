import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomValidators } from '@demo/shared-app/forms/validators';
import { AuthConfig } from '../../auth-app.config';
import { ResetPasswordFacade } from './+state/reset-password.facade';

@Component({
  selector: 'demo-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent implements OnInit {
  public readonly confirmationToken =
    this._route.snapshot.params['confirmationToken'];

  public readonly form = this._initForm();

  public readonly loading$ = this._resetPasswordFacade.loading$;

  public get passwordControl(): UntypedFormControl {
    return this.form.get('password') as UntypedFormControl;
  }

  public get confirmPasswordControl(): UntypedFormControl {
    return this.form.get('confirmPassword') as UntypedFormControl;
  }

  constructor(
    public readonly config: AuthConfig,
    private readonly _fb: UntypedFormBuilder,
    private readonly _resetPasswordFacade: ResetPasswordFacade,
    private readonly _route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  private _initForm() {
    return this._fb.group(
      {
        confirmationToken: [this.confirmationToken, [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: CustomValidators.confirmPassword(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  public onSubmit(): void {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    if (this.form.valid) {
      this._resetPasswordFacade.reset(this.form.value);
    }
  }
}
