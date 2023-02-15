import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromUi from './+state/ui.reducer';
import { UiEffects } from './+state/ui.effects';
import { SharedAppUiConfig } from './shared-app-ui.config';
import { UiFacade } from './+state/ui.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromUi.UI_FEATURE_KEY, fromUi.reducer),
    EffectsModule.forFeature([UiEffects]),
  ],
  providers: [
    UiFacade
  ],
  declarations: [
  ]
})
export class UiModule {
  public static forRoot(
    config: SharedAppUiConfig
  ): ModuleWithProviders<UiModule> {
    return {
      ngModule: UiModule,
      providers: [
        {
          provide: SharedAppUiConfig,
          useValue: config,
        },
      ],
    };
  }
}
