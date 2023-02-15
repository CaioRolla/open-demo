import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: '[demoVerticalNavItem]',
  templateUrl: './vertical-nav-item.component.html',
  styleUrls: ['./vertical-nav-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    ['[class.isActive]']: 'active',
  },
})
export class VerticalNavItemComponent {
  @Input() active = false;
}
