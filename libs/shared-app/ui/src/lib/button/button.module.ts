import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './button.component';
import { ProgressModule } from '../progress';
import { ButtonGroupComponent } from './button-group/button-group.component';

@NgModule({
  declarations: [ButtonComponent, ButtonGroupComponent],
  imports: [CommonModule, ProgressModule],
  exports: [ButtonComponent, ButtonGroupComponent],
})
export class ButtonModule {}
