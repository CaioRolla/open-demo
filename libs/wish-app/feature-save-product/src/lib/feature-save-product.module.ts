import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HeroIconsModule } from 'ng-heroicons';
import { PushModule } from '@rx-angular/template/push';

import { SaveProductComponent } from './save-product/save-product.component';
import * as fromSaveProduct from './+state/save-product.reducer';
import { SaveProductEffects } from './+state/save-product.effects';
import { SaveProductFacade } from './+state/save-product.facade';
import { SnackbarModule } from '@demo/shared-app/ui/snackbar';
import { DialogModule } from '@demo/shared-app/ui/dialog';
import { CardModule } from '@demo/shared-app/ui/card';
import { ButtonModule } from '@demo/shared-app/ui/button';
import { FormFieldModule } from '@demo/shared-app/forms/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingContentModule } from '@demo/shared-app/ui/loading-content';
import { ProgressModule } from '@demo/shared-app/ui/progress';
import { AssetUploadModule } from '@demo/+asset/app/asset-upload';
import { SharedAppUtilsModule } from '@demo/shared-app/utils';
import { NgxMaskModule } from 'ngx-mask'
import { CheckboxFieldModule } from '@demo/shared-app/forms/checkbox-field';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromSaveProduct.FEATURE_KEY,
      fromSaveProduct.reducer
    ),
    EffectsModule.forFeature([SaveProductEffects]),
    SnackbarModule,

    DialogModule,
    CardModule,
    ButtonModule,
    FormFieldModule,
    LoadingContentModule,

    ProgressModule,

    ReactiveFormsModule,
    HeroIconsModule,

    AssetUploadModule,
    CheckboxFieldModule,

    SharedAppUtilsModule,
    NgxMaskModule.forRoot(),
    PushModule    
  ],
  providers: [SaveProductFacade],
  declarations: [SaveProductComponent],
  entryComponents: [SaveProductComponent],
  exports: [SaveProductComponent],
})
export class FeatureSaveProductModule {}
