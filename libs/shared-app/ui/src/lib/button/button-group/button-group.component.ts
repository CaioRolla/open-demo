import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'demo-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonGroupComponent{
  constructor() {}
}
