import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[demoLoadingPlaceholder]',
  templateUrl: './loading-placeholder.component.html',
  styleUrls: ['./loading-placeholder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'loading-placeholder'
  }
})
export class LoadingPlaceholderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
