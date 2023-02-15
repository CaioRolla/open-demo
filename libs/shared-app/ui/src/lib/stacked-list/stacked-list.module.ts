import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StackedListComponent } from './stacked-list.component';
import { StackedListRowComponent } from './stacked-list-row/stacked-list-row.component';
import { CardModule } from '../card';
import { StackedListHeaderComponent } from './stacked-list-header/stacked-list-header.component';

@NgModule({
  declarations: [
    StackedListComponent,
    StackedListRowComponent,
    StackedListHeaderComponent
  ],
  imports: [
    CommonModule,
    CardModule
  ],
  exports: [
    StackedListComponent,
    StackedListRowComponent,
    StackedListHeaderComponent
  ]
})
export class StackedListModule { }
