import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'demo-delta-value',
  templateUrl: './delta-value.component.html',
  styleUrls: ['./delta-value.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeltaValueComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
