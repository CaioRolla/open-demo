import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'demo-vertical-nav',
  templateUrl: './vertical-nav.component.html',
  styleUrls: ['./vertical-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalNavComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
