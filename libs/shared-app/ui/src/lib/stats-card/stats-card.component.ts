import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'demo-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsCardComponent {

  @Input() loading = false;


}
