import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'demo-radio-card-group',
  templateUrl: './radio-card-group.component.html',
  styleUrls: ['./radio-card-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioCardGroupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
