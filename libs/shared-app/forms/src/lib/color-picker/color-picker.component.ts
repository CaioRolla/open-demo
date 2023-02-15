import {
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  UntypedFormControl,
} from '@angular/forms';
import { filter, map, shareReplay, startWith, tap } from 'rxjs';
import { BaseInputComponent } from '../form-field/base-input/base-input.component';

@Component({
  selector: 'demo-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorPickerComponent),
      multi: true,
    },
  ],
})
export class ColorPickerComponent
  extends BaseInputComponent
  implements OnInit, ControlValueAccessor
{
  public readonly form = new UntypedFormControl('');

  public open = false;

  public readonly color$ = this.form.valueChanges.pipe(
    filter((v) => !!v),
    map((v) => v.replace('#', ''))
  );

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange = (_: any) => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched = () => {};

  @HostListener('focusout')
  public override onFocusoutEvent(): void {
    // Emopty!
  }

  constructor(readonly elementRef: ElementRef) {
    super(elementRef);
  }

  writeValue(value: string): void {

    setTimeout(() => this.form.patchValue(value));
    
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  cpToggleChange(open: boolean) {
    this.focusChange.emit(open);
  }

  public valueChanged(value: string) {
    this.form.patchValue(value);
    this.onChange(value);
  }
}
