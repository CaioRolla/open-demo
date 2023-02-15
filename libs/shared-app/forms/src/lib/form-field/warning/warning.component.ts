import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'demo-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WarningComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
