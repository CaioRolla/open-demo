import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressStatsCardComponent } from './progress-stats-card.component';
import { ProgressStatsCardItemComponent } from './progress-stats-card-item/progress-stats-card-item.component';
import { CardModule } from '../card';
import { ProgressModule } from '../progress';
import { LoadingPlaceholderModule } from '../loading-placeholder';
import { TooltipModule } from '../tooltip';

@NgModule({
  declarations: [
    ProgressStatsCardComponent,
    ProgressStatsCardItemComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ProgressModule,
    LoadingPlaceholderModule,
    TooltipModule
  ],
  exports: [
    ProgressStatsCardComponent,
    ProgressStatsCardItemComponent
  ]
})
export class ProgressStatsCardModule { }
