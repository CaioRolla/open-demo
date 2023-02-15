import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthenticatedGuard } from '@demo/+auth/app/guards';
import { <%= className %>Component } from './<%= fileName %>/<%= fileName %>.component';
import * as from<%= className %> from './+state/<%= fileName %>.reducer';
import { <%= className %>Effects } from './+state/<%= fileName %>.effects';
import { <%= className %>Facade } from './+state/<%= fileName %>.facade';
import { SnackbarModule } from '@demo/shared-app/ui/snackbar';

@NgModule({
  imports: [
    CommonModule,
    <%= classDir %>PageWrapperModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: <%= className %>Component,
        canActivate: [AuthenticatedGuard]
      }
    ]),

    StoreModule.forFeature(
      from<%= className %>.FEATURE_KEY,
      from<%= className %>.reducer
    ),
    EffectsModule.forFeature([<%= className %>Effects]),
    SnackbarModule,
  ],
  providers: [
    <%= className %>Facade
  ],
  declarations: [
    <%= className %>Component
  ],
  entryComponents: [
    <%= className %>Component
  ],
  exports: [
    <%= className %>Component
  ]
})
export class Feature<%= className %>Module {}
