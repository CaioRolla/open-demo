import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from '../card';
import { StatsCardComponent } from './stats-card.component';
import { LoadingPlaceholderModule } from '../loading-placeholder';

@NgModule({
  declarations: [
    StatsCardComponent,
  ],
  imports: [
    CommonModule,
    CardModule,
    LoadingPlaceholderModule
  ],
  exports: [
    StatsCardComponent
  ]
})
export class StatsCardModule { }
