import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PushModule } from '@rx-angular/template/push';

import { DialogModule } from '@demo/shared-app/ui/dialog';
import { PublicListComponent } from './public-list/public-list.component';
import * as fromPublicList from './+state/public-list.reducer';
import { PublicListEffects } from './+state/public-list.effects';
import { PublicListFacade } from './+state/public-list.facade';
import { SnackbarModule } from '@demo/shared-app/ui/snackbar';
import { ListThemeProcessorModule } from '@demo/wish-app/ui/list-theme-processor';
import { NewPersonDialogComponent } from './dialogs/new-person-dialog/new-person-dialog.component';
import { SelectedProductDialogComponent } from './dialogs/selected-product-dialog/selected-product-dialog.component';
import { CardModule } from '@demo/shared-app/ui/card';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldModule } from '@demo/shared-app/forms/form-field';
import { ButtonModule } from '@demo/shared-app/ui/button';
import { SharedAppUtilsModule } from '@demo/shared-app/utils';
import { HeroIconsModule } from 'ng-heroicons';
import { LoadListResolver } from './resolvers/load-list.resolver';
import { FormSectionModule } from '@demo/shared-app/ui/form-section';
import { PixDialogComponent } from './dialogs/pix-dialog/pix-dialog.component';
import { ClipboardModule } from '@angular/cdk/clipboard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: ':listSlug',
        pathMatch: 'full',
        component: PublicListComponent,
        resolve: {
          loadList: LoadListResolver,
        },
      },
    ]),

    StoreModule.forFeature(fromPublicList.FEATURE_KEY, fromPublicList.reducer),
    EffectsModule.forFeature([PublicListEffects]),
    SnackbarModule,
    HeroIconsModule,

    ListThemeProcessorModule,

    DialogModule,
    CardModule,
    ReactiveFormsModule,
    FormFieldModule,
    ButtonModule,

    SharedAppUtilsModule,
    FormSectionModule,
    ClipboardModule,
    PushModule
  ],
  providers: [PublicListFacade, LoadListResolver],
  declarations: [
    PublicListComponent,
    NewPersonDialogComponent,
    SelectedProductDialogComponent,
    PixDialogComponent,
  ],
  entryComponents: [PublicListComponent],
  exports: [PublicListComponent],
})
export class FeaturePublicListModule {}
