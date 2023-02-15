import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ContentChild,
  ChangeDetectorRef,
  NgZone,
  AfterContentInit,
  OnDestroy,
} from '@angular/core';

import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators'

import { DemoPrefix } from './prefix/prefix.directive';
import { SelectComponent } from './select/select.component';
import { DemoSuffix } from './suffix/suffix.directive';
import { BaseInputComponent } from './base-input/base-input.component';
import { InputComponent } from './input/input.component';
import { ColorPickerComponent } from '../color-picker';

@Component({
  selector: 'demo-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent implements OnInit, AfterContentInit, OnDestroy {
  private readonly _subscriptions = new Subscription();

  @ContentChild(InputComponent) _input?: InputComponent;

  @ContentChild(SelectComponent) _select?: SelectComponent;

  @ContentChild(ColorPickerComponent) _colorPicker?: ColorPickerComponent;

  @ContentChild(DemoSuffix) _suffix?: DemoSuffix;

  @ContentChild(DemoPrefix) _prefix?: DemoPrefix;

  public onFocus = false;
  public isDisabled = false;
  public hasError = false;

  public get hasSuffix(): boolean {
    return this._hasSuffix();
  }

  public get hasPrefix(): boolean {
    return this._hasPrefix();
  }

  public get isSelect(): boolean {
    return this._isSelect();
  }

  public get input(): BaseInputComponent {
    return this._input ?? this._select ?? this._colorPicker as BaseInputComponent;
  }

  constructor(
    private readonly _cd: ChangeDetectorRef,
    private readonly _ngZone: NgZone
    ) {}

  ngOnInit(): void {
  
  }

  ngAfterContentInit(): void {
    this._calculateInputAppearence();
    this._handleInputFocusChangeEvents();
    this._handleInputDisabledChangeEvents();
    this._handleInputHasErrorChangeEvents();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  private _hasSuffix():boolean {
    return !!this._suffix;
  }

  private _hasPrefix():boolean {
    return !!this._prefix;
  }

  private _isSelect():boolean {
    return !!this._select;
  }

  private _calculateInputAppearence(): void {
    if(this.input){

      if (this._hasSuffix()) {
        this.input.hasSuffix = true;
      }  

      if (this._hasPrefix()) {
        this.input.hasPrefix = true;
      }  

    }
    this._cd.markForCheck();
  }

  private _handleInputFocusChangeEvents(): void {
    const sub = this.input?.focusChange.subscribe(focus => {
      this.onFocus = focus;
      this._cd.markForCheck();
    });
    this._subscriptions.add(sub);
  }

  private _handleInputDisabledChangeEvents(): void {
    const sub = this.input?.disableChange
    .pipe(startWith(this.input.isDisabled))
    .subscribe(isDisabled => {
      this.isDisabled = isDisabled;
      this._cd.markForCheck();
    });
    this._subscriptions.add(sub);
  }

  private _handleInputHasErrorChangeEvents(): void {
    const sub = this.input?.hasErrorChange
    .pipe(startWith(this.input.hasError))
    .subscribe(hasError => {
      this.hasError = hasError;
      this._cd.markForCheck();
    });
    this._subscriptions.add(sub);
  }
}
