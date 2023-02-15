import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';
import _ from 'lodash';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import { AuthConfig } from '../../auth-app.config';
import { LoginFacade } from './+state/login.facade';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'demo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly _subscription = new Subscription();
  public readonly form = this._initForm();

  public readonly loading$ = this._loginFacade.loading$;

  public readonly inviteId = this._route.snapshot.queryParams['inviteId'];

  public readonly googleAuthUrl =
    this.inviteId && this.config.googleAuthUrl
      ? `${this.config.googleAuthUrl}?inviteId=${this.inviteId}`
      : this.config.googleAuthUrl;

  public get emailControl(): UntypedFormControl {
    return this.form.get('email') as UntypedFormControl;
  }

  public get passwordControl(): UntypedFormControl {
    return this.form.get('password') as UntypedFormControl;
  }

  constructor(
    public readonly config: AuthConfig,
    private readonly _fb: UntypedFormBuilder,
    private readonly _loginFacade: LoginFacade,
    private readonly _cd: ChangeDetectorRef,
    private readonly _route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this._handleLoginError();
    this._handleErrorRemoval();
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private _initForm() {
    return this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public onSubmit(): void {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    if (this.form.valid) {
      this._loginFacade.login(this.form.value);
    }
  }

  private _handleLoginError(): void {
    const sub = this._loginFacade.error$.subscribe((error) => {
      if (!error) {
        this.emailControl.setErrors(null);
        this.passwordControl.setErrors(null);
      }

      if (error) {
        this.emailControl.setErrors({ failed: error });
        this.passwordControl.setErrors({ failed: error });
      }
    });

    this._subscription.add(sub);
  }

  private _handleErrorRemoval(): void {
    const sub = this.form.valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged((a, b) => _.isEqual(a, b))
      )
      .subscribe((value) => {
        if (
          this.emailControl.hasError('failed') ||
          this.passwordControl.hasError('failed')
        ) {
          this.emailControl.setErrors(null);
          this.passwordControl.setErrors(null);
          this.form.updateValueAndValidity();
          this._cd.markForCheck();
        }
      });
    this._subscription.add(sub);
  }
}
