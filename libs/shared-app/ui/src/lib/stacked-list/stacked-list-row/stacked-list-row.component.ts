import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'demo-stacked-list-row',
  templateUrl: './stacked-list-row.component.html',
  styleUrls: ['./stacked-list-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StackedListRowComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
