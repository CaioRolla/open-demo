import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'demo-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent implements OnInit {

  @Input() showingCount = 0;
  @Input() totalCount = 0;

  @Input() disableNext = false;
  @Input() disablePrevious = false;

  @Input() loading = false;

  @Output() previousClicked = new EventEmitter<void>();
  @Output() nextClicked = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
