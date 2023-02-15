import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CustomValidators } from '@demo/shared-app/forms/validators';
import { AuthConfig } from '../../auth-app.config';
import { RegisterFacade } from './+state/register.facade';

@Component({
  selector: 'demo-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  public readonly inviteId = this._route.snapshot.queryParams['inviteId'];

  public readonly email = this._route.snapshot.queryParams['email'];

  public readonly googleAuthUrl =
    this.inviteId && this.config.googleAuthUrl
      ? `${this.config.googleAuthUrl}?inviteId=${this.inviteId}`
      : this.config.googleAuthUrl;

  public readonly form = this._initForm();

  public get nameControl(): UntypedFormControl {
    return this.form.get('name') as UntypedFormControl;
  }

  public get emailControl(): UntypedFormControl {
    return this.form.get('email') as UntypedFormControl;
  }

  public get passwordControl(): UntypedFormControl {
    return this.form.get('password') as UntypedFormControl;
  }

  public get confirmPasswordControl(): UntypedFormControl {
    return this.form.get('confirmPassword') as UntypedFormControl;
  }

  public readonly loading$ = this._registerFacade.loading$;

  constructor(
    public readonly config: AuthConfig,
    private readonly _fb: UntypedFormBuilder,
    private readonly _registerFacade: RegisterFacade,
    private readonly _route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  private _initForm() {
    return this._fb.group(
      {
        name: ['', [Validators.required]],
        email: [this.email, [Validators.required, Validators.email]],
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
      this._registerFacade.register({
        ...this.form.value,
        inviteId: this.inviteId,
      });
    }
  }
}
