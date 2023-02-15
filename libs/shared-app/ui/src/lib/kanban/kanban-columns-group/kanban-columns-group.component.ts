import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'demo-kanban-columns-group',
  templateUrl: './kanban-columns-group.component.html',
  styleUrls: ['./kanban-columns-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanColumnsGroupComponent {
  private readonly _open$ = new BehaviorSubject(true);

  public readonly open$ = this._open$.asObservable();

  @Input() set open(open: boolean) {
    this._open$.next(open);
  }

  @Input() name: string = '';

  public toggleOpen(): void {
    this._open$.next(!this._open$.value);
  }
}
