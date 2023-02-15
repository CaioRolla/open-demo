import { Component, OnInit } from '@angular/core';

import { UiFacade } from '../../+state';

@Component({
  selector: 'demo-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public readonly sidebarIsOpen$ = this._uiFacade.sidebarIsOpen$;

  constructor(private readonly _uiFacade: UiFacade) {}

  ngOnInit(): void {}

  public openSidebar(): void {
    this._uiFacade.openSidebar();
  }

  public closeSidebar(): void {
    this._uiFacade.closeSidebar();
  }

  public toggleSidebar(): void {
    this._uiFacade.toggleSidebar();
  }
}
