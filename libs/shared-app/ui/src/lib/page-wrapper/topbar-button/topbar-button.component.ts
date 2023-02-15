import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[demo-topbar-button]',
  templateUrl: './topbar-button.component.html',
  styleUrls: ['./topbar-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarButtonComponent {

  @Input() badgeValue:  string | null = null;
}
