import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'demo-breadcumb',
  templateUrl: './breadcumb.component.html',
  styleUrls: ['./breadcumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcumbComponent {}
