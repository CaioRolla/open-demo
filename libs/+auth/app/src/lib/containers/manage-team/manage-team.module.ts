import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HeroIconsModule } from 'ng-heroicons';
import { PushModule } from '@rx-angular/template/push';

import * as fromManageTeam from './+state/manage-team.reducer';
import { ManageTeamEffects } from './+state/manage-team.effects';
import { ManageTeamFacade } from './+state/manage-team.facade';
import { ManageTeamComponent } from './manage-team.component';
import { RouterModule } from '@angular/router';
import { CardModule } from '@demo/shared-app/ui/card';
import { PaginatorModule } from '@demo/shared-app/ui/paginator';
import { StackedListModule } from '@demo/shared-app/ui/stacked-list';
import { LoadingPlaceholderModule } from '@demo/shared-app/ui/loading-placeholder';
import { ButtonModule } from '@demo/shared-app/ui/button';
import { FormFieldModule } from '@demo/shared-app/forms/form-field';
import { TooltipModule } from '@demo/shared-app/ui/tooltip';
import { MenuModule } from '@demo/shared-app/ui/menu';
import { DialogModule } from '@demo/shared-app/ui/dialog';
import { LoadingContentModule } from '@demo/shared-app/ui/loading-content';
import { PermissionsDialogModule } from '../permissions-dialog/permissions-dialog.module';
import { AuthDirectivesModule } from '../../directives';

@NgModule({
  declarations: [ManageTeamComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ManageTeamComponent
      },
    ]),
    StoreModule.forFeature(
      fromManageTeam.FEATURE_KEY,
      fromManageTeam.reducer,
      {}
    ),
    EffectsModule.forFeature([ManageTeamEffects]),

    CardModule,
    PaginatorModule,
    StackedListModule,
    LoadingPlaceholderModule,
    ReactiveFormsModule,
    ButtonModule,
    FormFieldModule,
    HeroIconsModule,
    TooltipModule,
    MenuModule,
    DialogModule,
    PermissionsDialogModule,
    LoadingContentModule,
    AuthDirectivesModule,
    PushModule
  ],
  providers: [ManageTeamFacade],
})
export class ManageTeamModule {}