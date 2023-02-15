import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { PushModule } from '@rx-angular/template/push';

import { CreateListComponent } from './create-list/create-list.component';
import * as fromCreateList from './+state/create-list.reducer';
import { CreateListEffects } from './+state/create-list.effects';
import { CreateListFacade } from './+state/create-list.facade';
import { SnackbarModule } from '@demo/shared-app/ui/snackbar';
import { DialogModule } from '@demo/shared-app/ui/dialog';
import { CardModule } from '@demo/shared-app/ui/card';
import { ButtonModule } from '@demo/shared-app/ui/button';
import { FormFieldModule } from '@demo/shared-app/forms/form-field';
import { SharedAppUtilsModule } from '@demo/shared-app/utils';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromCreateList.FEATURE_KEY, fromCreateList.reducer),
    EffectsModule.forFeature([CreateListEffects]),
    SnackbarModule,

    DialogModule,
    CardModule,
    ButtonModule,
    FormFieldModule,

    ReactiveFormsModule,

    SharedAppUtilsModule,
    PushModule
  ],
  providers: [CreateListFacade],
  declarations: [CreateListComponent],
  entryComponents: [CreateListComponent],
  exports: [CreateListComponent],
})
export class FeatureCreateListModule {}
