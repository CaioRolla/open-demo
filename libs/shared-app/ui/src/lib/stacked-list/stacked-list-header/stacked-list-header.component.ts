import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'demo-stacked-list-header',
  templateUrl: './stacked-list-header.component.html',
  styleUrls: ['./stacked-list-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StackedListHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
