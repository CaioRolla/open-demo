import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroIconsModule } from 'ng-heroicons';

import { PageWrapperComponent } from './page-wrapper.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { TopbarButtonComponent } from './topbar-button/topbar-button.component';
import { ProgressModule } from '@demo/shared-app/ui/progress';

@NgModule({
  declarations: [
    PageWrapperComponent,
    SidebarComponent,
    TopbarComponent,
    TopbarButtonComponent,
  ],
  imports: [CommonModule, HeroIconsModule, ProgressModule],
  exports: [
    PageWrapperComponent,
    SidebarComponent,
    TopbarComponent,
    TopbarButtonComponent,
  ],
  providers: [],
})
export class PageWrapperModule {}
