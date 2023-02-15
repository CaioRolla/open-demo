import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'demo-pill',
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PillComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
