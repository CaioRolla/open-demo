import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PushModule } from '@rx-angular/template/push';

import { AuthenticatedGuard } from '@demo/+auth/app/guards';
import { HomeComponent } from './home/home.component';
import * as fromHome from './+state/home.reducer';
import { HomeEffects } from './+state/home.effects';
import { HomeFacade } from './+state/home.facade';
import { SnackbarModule } from '@demo/shared-app/ui/snackbar';
import { WishAppPageWrapperModule } from '@demo/wish-app/ui/wish-app-page-wrapper';
import { FeatureCreateListModule } from '@demo/wish-app/feature-create-list';
import { DialogModule } from '@demo/shared-app/ui/dialog';
import { ButtonModule } from '@demo/shared-app/ui/button';
import { HeroIconsModule } from 'ng-heroicons';
import { PaginatorModule } from '@demo/shared-app/ui/paginator';
import { StackedListModule } from '@demo/shared-app/ui/stacked-list';
import { ChipModule } from '@demo/shared-app/ui/chip';
import { LoadingPlaceholderModule } from '@demo/shared-app/ui/loading-placeholder';
import { FeatureDeleteListModule } from '@demo/wish-app/feature-delete-list';
import { SharedAppUtilsModule } from '@demo/shared-app/utils';
import { EmptyStateModule } from '@demo/shared-app/ui/empty-state';
import { MenuModule } from '@demo/shared-app/ui/menu';

@NgModule({
  imports: [
    CommonModule,
    WishAppPageWrapperModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
        canActivate: [AuthenticatedGuard],
      },
    ]),
    StoreModule.forFeature(fromHome.FEATURE_KEY, fromHome.reducer),
    EffectsModule.forFeature([HomeEffects]),
    SnackbarModule,
    DialogModule,
    PaginatorModule,
    StackedListModule,
    LoadingPlaceholderModule,
    SharedAppUtilsModule,

    ButtonModule,
    HeroIconsModule,
    ChipModule,

    FeatureCreateListModule,
    FeatureDeleteListModule,

    EmptyStateModule,
    MenuModule,
    PushModule
  ],
  providers: [HomeFacade],
  declarations: [HomeComponent],
  entryComponents: [HomeComponent],
  exports: [HomeComponent],
})
export class FeatureHomeModule {}
