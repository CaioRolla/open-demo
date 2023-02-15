import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { MenuDirective } from './menu.directive';

import { MenuSeparatorItemComponent } from './menu-separator-item/menu-separator-item.component';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [MenuComponent, MenuDirective, MenuSeparatorItemComponent],
  imports: [CommonModule, OverlayModule],
  exports: [MenuComponent, MenuDirective, MenuSeparatorItemComponent],
})
export class MenuModule {}
