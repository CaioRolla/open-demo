import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { UiState } from './ui.reducer';
import * as Actions from './ui.actions';
import * as Selectors from './ui.selectors';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class UiFacade {
  public readonly sidebarIsOpen$ = this._store.select(Selectors.getSidebarIsOpen);

  constructor(private readonly _store: Store<UiState>, @Inject(DOCUMENT) private document: Document) {
    if(this.document.body.offsetWidth > 600){
      this.openSidebar();
    }
  }

  public openSidebar(): void {
    this._store.dispatch(Actions.openSidebar());
  }

  public closeSidebar(): void {
    this._store.dispatch(Actions.closeSidebar());
  }

  public toggleSidebar(): void {
    this._store.dispatch(Actions.toggleSidebar());
  }

  public setPageTitle(title: string): void {
    this._store.dispatch(Actions.setPageTitle({ title }));
  }
}
