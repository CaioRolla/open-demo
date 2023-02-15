import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabGroupComponent } from './tab-group.component';
import { TabComponent } from './tab/tab.component';
import { TabHeaderComponent } from './tab-header/tab-header.component';
import { CardModule } from '../card';

@NgModule({
  declarations: [
    TabGroupComponent,
    TabComponent,
    TabHeaderComponent
  ],
  imports: [
    CommonModule,
    CardModule
  ],
  exports: [
    TabGroupComponent,
    TabComponent,
    TabHeaderComponent
  ]
})
export class TabsModule { }
