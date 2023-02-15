import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'demo-kanban-column',
  templateUrl: './kanban-column.component.html',
  styleUrls: ['./kanban-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanColumnComponent implements OnInit {


  constructor() {}

  ngOnInit(): void {}
}
