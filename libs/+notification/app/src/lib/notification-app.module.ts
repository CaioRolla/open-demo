import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationAppConfig } from './notification-app.config';
import { NotificationService } from './services/notification.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromNotification from './+state/notification.reducer';
import { NotificationEffects } from './+state/notification.effects';
import { NotificationFacade } from './+state/notification.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromNotification.FEATURE_KEY,
      fromNotification.reducer
    ),
    EffectsModule.forFeature([NotificationEffects]),
  ],
  providers: [NotificationService, NotificationFacade]
})
export class NotificationAppModule {
  static forRoot(
    config: NotificationAppConfig
  ): ModuleWithProviders<NotificationAppModule> {
    return {
      ngModule: NotificationAppModule,
      providers: [{ provide: NotificationAppConfig, useValue: config }],
    };
  }
}
