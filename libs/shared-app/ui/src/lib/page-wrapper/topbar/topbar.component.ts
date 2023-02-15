import { Component, Input, OnInit } from '@angular/core';

import { UiFacade } from '../../+state';

@Component({
  selector: 'demo-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {

  @Input() alwaysShowLogo = false;

  constructor(private readonly _uiFacade: UiFacade) {}

  public toggleSidebar(): void {
    this._uiFacade.toggleSidebar();
  }
}
