import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'button[demo-radio-group-button]',
  templateUrl: './radio-group-button.component.html',
  styleUrls: ['./radio-group-button.component.scss'],
  host: {
    class: 'radio-group-button',
    '[class.radio-group-button--selected]': 'selected',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupButtonComponent {
  @Input() selected = false;

  constructor() {}
}
