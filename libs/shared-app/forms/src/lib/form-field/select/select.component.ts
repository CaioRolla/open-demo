import { Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

import { BaseInputComponent } from '../base-input/base-input.component';

@Component({
  selector: '[demo-select]',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  host: {
    class: 'select',
    '[class.select--disabled]': `isDisabled`,
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SelectComponent extends BaseInputComponent {

  public isMultiple = false;

  @Output() multipleChange = new EventEmitter<boolean>();

  @Input('multiple')
  public set onMultipleChange(multiple: string) {
    this.isMultiple = multiple === '' || multiple === 'false';
    this.multipleChange.emit(this.isMultiple);
  }

  constructor(
    readonly elementRef: ElementRef,
    public readonly _cd: ChangeDetectorRef
    ) {
    super(elementRef);
  }

}
