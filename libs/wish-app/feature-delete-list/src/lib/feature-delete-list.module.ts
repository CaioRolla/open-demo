import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PushModule } from '@rx-angular/template/push';

import { DeleteListComponent } from './delete-list/delete-list.component';
import * as fromDeleteList from './+state/delete-list.reducer';
import { DeleteListEffects } from './+state/delete-list.effects';
import { DeleteListFacade } from './+state/delete-list.facade';
import { SnackbarModule } from '@demo/shared-app/ui/snackbar';
import { DialogModule } from '@demo/shared-app/ui/dialog';
import { ButtonModule } from '@demo/shared-app/ui/button';
import { CardModule } from '@demo/shared-app/ui/card';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromDeleteList.FEATURE_KEY, fromDeleteList.reducer),
    EffectsModule.forFeature([DeleteListEffects]),
    SnackbarModule,

    DialogModule,
    CardModule,
    ButtonModule,
    PushModule
  ],
  providers: [DeleteListFacade],
  declarations: [DeleteListComponent],
  entryComponents: [DeleteListComponent],
  exports: [DeleteListComponent],
})
export class FeatureDeleteListModule {}
