import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { HeroIconsModule } from 'ng-heroicons';
import { PushModule } from '@rx-angular/template/push';

import { WishAppPageWrapperComponent } from './wish-app-page-wrapper.component';
import { PageWrapperModule } from '@demo/shared-app/ui/page-wrapper';
import { AuthDirectivesModule } from '@demo/+auth/app/directives';

@NgModule({
  declarations: [
    WishAppPageWrapperComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PageWrapperModule,
    HeroIconsModule,
    AuthDirectivesModule,
    PushModule
  ],
  exports: [
    WishAppPageWrapperComponent
  ]
})
export class WishAppPageWrapperModule { }
