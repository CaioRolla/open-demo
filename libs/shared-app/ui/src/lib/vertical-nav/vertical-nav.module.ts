import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalNavComponent } from './vertical-nav.component';
import { VerticalNavItemComponent } from './vertical-nav-item/vertical-nav-item.component';

@NgModule({
  declarations: [VerticalNavComponent, VerticalNavItemComponent],
  imports: [CommonModule],
  exports: [VerticalNavComponent, VerticalNavItemComponent],
})
export class VerticalNavModule {}
