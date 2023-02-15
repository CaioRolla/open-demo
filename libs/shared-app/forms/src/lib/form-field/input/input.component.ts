import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ElementRef,
} from '@angular/core';
import { BaseInputComponent } from '../base-input/base-input.component';

@Component({
  selector: '[demo-input]',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  host: {
    class: 'input',
    '[class.input--disabled]': `isDisabled`,
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class InputComponent extends BaseInputComponent {
  
  constructor(readonly elementRef: ElementRef) {
    super(elementRef);
  }

}
