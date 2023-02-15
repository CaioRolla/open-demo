import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HeroIconsModule,
  arrowRight,
  home,
  chartBar,
  adjustments,
  menuAlt1,
  arrowNarrowRight,
  chevronLeft,
  chevronRight,
  chevronDown,
  chevronUp,
  check,
  photograph,
  trash,
  paperClip,
  heart,
  calendar,
  currencyDollar,
  informationCircle,
  userGroup,
  clipboard,
  logout,
  cash,
  creditCard,
  checkCircleSolid,
  informationCircleSolid,
  exclamation,
  xCircleSolid,
  globeAlt,
  exclamationCircle,
  clock,
  plus,
  x,
  pencil,
  viewList,
  terminal,
  receiptTax,
  cog,
  support,
  mail,
  userGroupSolid,
  ticket,
  refresh,
  dotsVertical,
  clipboardList,
  share,
  colorSwatch,
  upload,
  externalLink,
  search,
} from 'ng-heroicons';
import { localStorageSync } from 'ngrx-store-localstorage';

import { AuthAppModule } from '@demo/+auth/app';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { OffcanvasModule } from '@demo/shared-app/ui/offcanvas';
import { UiModule } from '@demo/shared-app/ui';
import { WishAppApplicationModule } from '@demo/wish-app/application';
import { AssetAppModule } from '@demo/+asset/app';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    BrowserAnimationsModule,
    UiModule.forRoot({
      applicationName: 'Lista Ideal',
    }),
    RouterModule.forRoot(routes),
    EffectsModule.forRoot([]),
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
        metaReducers: [localStorageSyncReducer],
      }
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 50,
      logOnly: environment.production,
    }),
    HeroIconsModule.withIcons({
      arrowRight,
      home,
      chartBar,
      adjustments,
      menuAlt1,
      arrowNarrowRight,
      chevronLeft,
      chevronRight,
      check,
      photograph,
      trash,
      paperClip,
      heart,
      calendar,
      currencyDollar,
      informationCircle,
      userGroup,
      clipboard,
      logout,
      cash,
      creditCard,
      checkCircleSolid,
      informationCircleSolid,
      exclamation,
      xCircleSolid,
      globeAlt,
      exclamationCircle,
      clock,
      chevronDown,
      chevronUp,
      plus,
      x,
      pencil,
      viewList,
      terminal,
      receiptTax,
      cog,
      support,
      mail,
      userGroupSolid,
      ticket,
      refresh,
      dotsVertical,
      clipboardList,
      share,
      colorSwatch,
      upload,
      externalLink,
      search,
    }),
    OffcanvasModule.forRoot(),

    AuthAppModule.forRoot({
      applicationLogoUrl: 'assets/logo.svg',
      googleAuthUrl: `${environment.baseApi}/v1/auth/google`,
      signInSuccessRoute: '',
      termsOfServiceUrl: '/',
      baseApi: environment.baseApi,
      appName: 'Lista Ideal',
      permissions: [],
    }),
    WishAppApplicationModule.forRoot({ baseApi: environment.baseApi }),
    AssetAppModule.forRoot({ baseApi: environment.baseApi }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

const INIT_ACTION = '@ngrx/store/init';
const UPDATE_ACTION = '@ngrx/store/update-reducers';

const mergeReducer = (state: any, rehydratedState: any, action: any) => {
  if ((action.type === INIT_ACTION || action.type === UPDATE_ACTION) && rehydratedState) {
    return { ...state, ...rehydratedState };
  }
  return state;
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['auth-app'],
    rehydrate: true,
    mergeReducer,
  })(reducer);
}
