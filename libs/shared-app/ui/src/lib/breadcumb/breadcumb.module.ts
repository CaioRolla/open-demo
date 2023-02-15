import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcumbComponent } from './breadcumb.component';
import { BreadcumbDividerComponent } from './breadcumb-divider/breadcumb-divider.component';
import { HeroIconsModule } from 'ng-heroicons';

@NgModule({
  declarations: [BreadcumbComponent, BreadcumbDividerComponent],
  imports: [CommonModule, HeroIconsModule],
  exports: [BreadcumbComponent, BreadcumbDividerComponent],
})
export class BreadcumbModule {}
