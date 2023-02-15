import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanComponent } from './kanban.component';
import { KanbanColumnComponent } from './kanban-column/kanban-column.component';
import { CardModule } from '../card';
import { HeroIconsModule } from 'ng-heroicons';
import { KanbanHeaderItemComponent } from './kanban-header-item/kanban-header-item.component';
import { KanbanColumnsGroupComponent } from './kanban-columns-group/kanban-columns-group.component';

@NgModule({
  declarations: [
    KanbanComponent,
    KanbanColumnComponent,
    KanbanHeaderItemComponent,
    KanbanColumnsGroupComponent,
  ],
  imports: [CommonModule, CardModule, HeroIconsModule],
  exports: [
    KanbanComponent,
    KanbanColumnComponent,
    KanbanHeaderItemComponent,
    KanbanColumnsGroupComponent,
  ],
})
export class KanbanModule {}
