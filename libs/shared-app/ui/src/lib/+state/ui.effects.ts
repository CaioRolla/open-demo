import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { tap, map, filter, delay } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

import * as UiActions from './ui.actions';
import { UiFacade } from './ui.facade';
import * as UiFeature from './ui.reducer';
import { SharedAppUiConfig } from '../shared-app-ui.config';
import { DOCUMENT } from '@angular/common';

// eslint-disable-next-line no-var
@Injectable()
export class UiEffects {
  public readonly handleTitle$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(UiActions.setPageTitle),

        map((action) => {
          if (!action.title && this._uiConfig.applicationName) {
            this._title.setTitle(this._uiConfig.applicationName);

            this._meta.addTags([{ name: 'og:title', content: this._uiConfig.applicationName }]);

            return;
          }

          const title = action.title + ' - ' + this._uiConfig.applicationName;

          this._title.setTitle(title);

          this._meta.removeTag('property="og:title"');
          this._meta.removeTag('name="twitter:title"');

          this._meta.addTags([
            { property: 'og:title', content: title },
            { name: 'twitter:title', content: title },
          ]);
        })
      );
    },
    { dispatch: false }
  );

  public readonly handleNavigationClose$ = createEffect(
    () =>
      this._router.events.pipe(
        delay(100),
        filter((event) => event instanceof NavigationEnd),
        filter(() => this.document.body.offsetWidth <= 600),
        tap(() => {
          this._uiFacade.closeSidebar();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private readonly _meta: Meta,
    private readonly _title: Title,
    private readonly _actions$: Actions,
    private readonly _uiConfig: SharedAppUiConfig,
    private readonly _router: Router,
    private readonly _uiFacade: UiFacade,
    @Inject(DOCUMENT) private document: Document
  ) {}
}
