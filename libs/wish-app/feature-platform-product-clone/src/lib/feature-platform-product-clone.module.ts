import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HeroIconsModule } from 'ng-heroicons';
import { PushModule } from '@rx-angular/template/push';

import { LoadingContentModule } from '@demo/shared-app/ui/loading-content';
import { TooltipModule } from '@demo/shared-app/ui/tooltip';
import { PlatformProductCloneComponent } from './platform-product-clone/platform-product-clone.component';
import * as fromPlatformProductClone from './+state/platform-product-clone.reducer';
import { PlatformProductCloneEffects } from './+state/platform-product-clone.effects';
import { PlatformProductCloneFacade } from './+state/platform-product-clone.facade';
import { SnackbarModule } from '@demo/shared-app/ui/snackbar';
import { DialogModule } from '@demo/shared-app/ui/dialog';
import { CardModule } from '@demo/shared-app/ui/card';
import { LoadingPlaceholderModule } from '@demo/shared-app/ui/loading-placeholder';
import { ButtonModule } from '@demo/shared-app/ui/button';
import { StackedListModule } from '@demo/shared-app/ui/stacked-list';
import { SharedAppUtilsModule } from '@demo/shared-app/utils';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldModule } from '@demo/shared-app/forms/form-field';
import { CheckboxFieldModule } from '@demo/shared-app/forms/checkbox-field';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromPlatformProductClone.FEATURE_KEY,
      fromPlatformProductClone.reducer
    ),
    EffectsModule.forFeature([PlatformProductCloneEffects]),
    SnackbarModule,
    ReactiveFormsModule,

    DialogModule,
    CardModule,
    LoadingPlaceholderModule,
    LoadingContentModule,
    HeroIconsModule,
    ButtonModule,
    StackedListModule,
    SharedAppUtilsModule,
    TooltipModule,
    FormFieldModule,
    CheckboxFieldModule,
    PushModule
  ],
  providers: [PlatformProductCloneFacade],
  declarations: [PlatformProductCloneComponent],
  entryComponents: [PlatformProductCloneComponent],
  exports: [PlatformProductCloneComponent],
})
export class FeaturePlatformProductCloneModule {}
