import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'demo-progress-stats-card-item',
  templateUrl: './progress-stats-card-item.component.html',
  styleUrls: ['./progress-stats-card-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressStatsCardItemComponent {

  @Input() value!: number | string;

  @Input() percentage!: number;

  @Input() label!: string;

  @Input() color!: string;

  @Input() loading = false;
}
