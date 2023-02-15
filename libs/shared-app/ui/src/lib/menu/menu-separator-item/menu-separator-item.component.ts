import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'demo-menu-separator-item',
  templateUrl: './menu-separator-item.component.html',
  styleUrls: ['./menu-separator-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuSeparatorItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
