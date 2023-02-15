import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'demo-hint',
  templateUrl: './hint.component.html',
  styleUrls: ['./hint.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HintComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
