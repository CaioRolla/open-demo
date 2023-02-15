import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
} from '@angular/core';
import { DemoColorScheme } from '../interfaces';

@Component({
  selector: '[demoChip]',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'chip',
    '[class.chip--warning]': `color === 'warning'`,
    '[class.chip--primary]': `color === 'primary'`,
    '[class.chip--success]': `color === 'success'`,
    '[class.chip--danger]': `color === 'danger'`,
  },
})
export class ChipComponent {
  @Input('demoChip') color: DemoColorScheme | ''  = 'neutral';
}
