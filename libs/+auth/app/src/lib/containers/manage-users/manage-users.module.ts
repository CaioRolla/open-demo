import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { HeroIconsModule } from 'ng-heroicons';
import { PushModule } from '@rx-angular/template/push';

import { ManageUsersComponent } from './manage-users.component';
import * as fromManageUsers from './+state/manage-users.reducer';
import { ManageUsersEffects } from './+state/manage-users.effects';
import { ManageUsersFacade } from './+state/manage-users.facade';
import { RouterModule } from '@angular/router';
import { CardModule } from '@demo/shared-app/ui/card';
import { PaginatorModule } from '@demo/shared-app/ui/paginator';
import { StackedListModule } from '@demo/shared-app/ui/stacked-list';
import { LoadingPlaceholderModule } from '@demo/shared-app/ui/loading-placeholder';
import { ButtonModule } from '@demo/shared-app/ui/button';
import { FormFieldModule } from '@demo/shared-app/forms/form-field';
import { TooltipModule } from '@demo/shared-app/ui/tooltip';
import { DialogModule } from '@demo/shared-app/ui/dialog';
import { PermissionsDialogModule } from '../permissions-dialog/permissions-dialog.module';
import { LoadingContentModule } from '@demo/shared-app/ui/loading-content';
import { ChipModule } from '@demo/shared-app/ui/chip';
import { AuthDirectivesModule } from '../../directives';

@NgModule({
  declarations: [ManageUsersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ManageUsersComponent
      },
    ]),
    StoreModule.forFeature(
      fromManageUsers.FEATURE_KEY,
      fromManageUsers.reducer,
      {}
    ),
    EffectsModule.forFeature([ManageUsersEffects]),

    CardModule,
    PaginatorModule,
    StackedListModule,
    LoadingPlaceholderModule,
    ReactiveFormsModule,
    ButtonModule,
    FormFieldModule,
    HeroIconsModule,
    TooltipModule,
    DialogModule,
    PermissionsDialogModule,
    LoadingContentModule,
    AuthDirectivesModule,
    ChipModule,
    PushModule
  ],
  providers: [ManageUsersFacade]
})
export class ManageUsersModule {}
