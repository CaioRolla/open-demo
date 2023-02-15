import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'demo-stacked-list',
  templateUrl: './stacked-list.component.html',
  styleUrls: ['./stacked-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StackedListComponent implements OnInit {

  @Input() mode: 'card' | 'box' = "card"

  constructor() { }

  ngOnInit(): void {
  }

}
