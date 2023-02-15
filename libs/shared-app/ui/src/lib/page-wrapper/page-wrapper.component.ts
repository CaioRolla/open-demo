import { Component, Input } from '@angular/core';

import { UiFacade } from '../+state';

@Component({
  selector: 'demo-page-wrapper',
  templateUrl: './page-wrapper.component.html',
  styleUrls: ['./page-wrapper.component.scss']
})
export class PageWrapperComponent {

  @Input() loading = false;

  @Input() set pageTitle(title: string) {
    this._uiFacade.setPageTitle(title);
  }

  constructor(
    private readonly _uiFacade: UiFacade
  ) { }


}
