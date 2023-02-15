import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PushModule } from '@rx-angular/template/push';
import { AdsenseModule } from 'ng2-adsense';

import { ListThemeProcessorComponent } from './list-theme-processor.component';
import { BasicThemeComponent } from './themes/basic-theme/basic-theme.component';
import { ButtonModule } from '@demo/shared-app/ui/button';
import { HeroIconsModule } from 'ng-heroicons';
import { CardModule } from '@demo/shared-app/ui/card';
import { SharedAppUtilsModule } from '@demo/shared-app/utils';
import { TooltipModule } from '@demo/shared-app/ui/tooltip';

@NgModule({
  declarations: [ListThemeProcessorComponent, BasicThemeComponent],
  imports: [
    CommonModule,
    ButtonModule,
    HeroIconsModule,
    CardModule,
    SharedAppUtilsModule,
    TooltipModule,
    PushModule,
    // AdsenseModule.forRoot({

    // }),
  ],
  exports: [ListThemeProcessorComponent],
})
export class ListThemeProcessorModule {}
