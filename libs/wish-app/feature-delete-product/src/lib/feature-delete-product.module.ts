import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PushModule } from '@rx-angular/template/push';

import { DeleteProductComponent } from './delete-product/delete-product.component';
import * as fromDeleteProduct from './+state/delete-product.reducer';
import { DeleteProductEffects } from './+state/delete-product.effects';
import { DeleteProductFacade } from './+state/delete-product.facade';
import { SnackbarModule } from '@demo/shared-app/ui/snackbar';
import { DialogModule } from '@demo/shared-app/ui/dialog';
import { ButtonModule } from '@demo/shared-app/ui/button';
import { CardModule } from '@demo/shared-app/ui/card';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromDeleteProduct.FEATURE_KEY, fromDeleteProduct.reducer),
    EffectsModule.forFeature([DeleteProductEffects]),
    SnackbarModule,

    DialogModule,
    CardModule,
    ButtonModule,
    PushModule
  ],
  providers: [DeleteProductFacade],
  declarations: [DeleteProductComponent],
  entryComponents: [DeleteProductComponent],
  exports: [DeleteProductComponent],
})
export class FeatureDeleteProductModule {}
