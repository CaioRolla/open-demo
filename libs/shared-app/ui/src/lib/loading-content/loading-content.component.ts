import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'demo-loading-content',
  templateUrl: './loading-content.component.html',
  styleUrls: ['./loading-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingContentComponent  {

  @Input() loading: boolean = false;

  @Input() showLabel: boolean = true;

}
