import { Component, ChangeDetectionStrategy, ContentChild, ElementRef, AfterContentInit, ContentChildren, QueryList } from '@angular/core';
import { CheckboxFieldInputDirective } from './checkbox-field-input.directive';

@Component({
  selector: 'demo-checkbox-field',
  templateUrl: './checkbox-field.component.html',
  styleUrls: ['./checkbox-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxFieldComponent{
  @ContentChild(CheckboxFieldInputDirective, { read: ElementRef })
  public readonly input?: ElementRef<HTMLInputElement>;

  public click(): void {
    this.input?.nativeElement.click();
  }

}
