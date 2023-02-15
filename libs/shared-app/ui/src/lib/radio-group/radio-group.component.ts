import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'demo-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioGroupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
