import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'demo-kanban-header-item',
  templateUrl: './kanban-header-item.component.html',
  styleUrls: ['./kanban-header-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanHeaderItemComponent {}
