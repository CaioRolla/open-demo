import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { PushModule } from '@rx-angular/template/push';

import { RadioCardModule } from '@demo/shared-app/forms/radio-card';
import { TabsModule } from '@demo/shared-app/ui/tabs';
import { AuthenticatedGuard } from '@demo/+auth/app/guards';
import { ManageListComponent } from './manage-list/manage-list.component';
import * as fromManageList from './+state/manage-list.reducer';
import { ManageListEffects } from './+state/manage-list.effects';
import { ManageListFacade } from './+state/manage-list.facade';
import { SnackbarModule } from '@demo/shared-app/ui/snackbar';
import { WishAppPageWrapperModule } from '@demo/wish-app/ui/wish-app-page-wrapper';
import { BrowserFrameModule } from '@demo/shared-app/ui/browser-frame';
import { HeroIconsModule } from 'ng-heroicons';
import { AppearanceTabComponent } from './tabs/appearance-tab/appearance-tab.component';
import { ProductsTabComponent } from './tabs/products-tab/products-tab.component';
import { CardModule } from '@demo/shared-app/ui/card';
import { ButtonModule } from '@demo/shared-app/ui/button';
import { StackedListModule } from '@demo/shared-app/ui/stacked-list';
import { LoadingPlaceholderModule } from '@demo/shared-app/ui/loading-placeholder';
import { DialogModule } from '@demo/shared-app/ui/dialog';
import { FeatureSaveProductModule } from '@demo/wish-app/feature-save-product';
import { FeatureDeleteProductModule } from '@demo/wish-app/feature-delete-product';
import { LoadListResolver } from './resolvers/load-list.resolver';
import { SharedAppUtilsModule } from '@demo/shared-app/utils';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldModule } from '@demo/shared-app/forms/form-field';
import { ColorPickerModule } from '@demo/shared-app/forms/color-picker';
import { SettingsTabComponent } from './tabs/settings-tab/settings-tab.component';
import { ListThemeProcessorModule } from '@demo/wish-app/ui/list-theme-processor';
import { AssetUploadModule } from '@demo/+asset/app/asset-upload';
import { ColorPickerModule as ColorPickerModuleLib } from 'ngx-color-picker';
import { TooltipModule } from '@demo/shared-app/ui/tooltip';
import { FormSectionModule } from '@demo/shared-app/ui/form-section';
import { MenuModule } from '@demo/shared-app/ui/menu';
import { FeaturePlatformProductCloneModule } from '@demo/wish-app/feature-platform-product-clone';

@NgModule({
  imports: [
    CommonModule,
    WishAppPageWrapperModule,
    RouterModule.forChild([
      {
        path: ':listId',
        pathMatch: 'full',
        component: ManageListComponent,
        canActivate: [AuthenticatedGuard],
        resolve: {
          loadList: LoadListResolver,
        },
      },
    ]),
    StoreModule.forFeature(fromManageList.FEATURE_KEY, fromManageList.reducer),
    EffectsModule.forFeature([ManageListEffects]),
    SnackbarModule,

    BrowserFrameModule,
    TabsModule,
    HeroIconsModule,
    CardModule,

    DialogModule,
    ButtonModule,
    StackedListModule,
    LoadingPlaceholderModule,
    SharedAppUtilsModule,
    FormFieldModule,
    ClipboardModule,

    FeatureSaveProductModule,
    FeatureDeleteProductModule,

    ReactiveFormsModule,
    ListThemeProcessorModule,

    RadioCardModule,
    AssetUploadModule,
    ColorPickerModule,

    ColorPickerModuleLib,

    TooltipModule,
    FormSectionModule,
    MenuModule,

    FeaturePlatformProductCloneModule,
    PushModule
  ],
  providers: [ManageListFacade, LoadListResolver],
  declarations: [
    ManageListComponent,
    AppearanceTabComponent,
    ProductsTabComponent,
    SettingsTabComponent,
    
  ],
  entryComponents: [ManageListComponent],
  exports: [ManageListComponent],
})
export class FeatureManageListModule {}
