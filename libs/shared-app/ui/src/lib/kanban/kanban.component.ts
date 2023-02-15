import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'demo-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
