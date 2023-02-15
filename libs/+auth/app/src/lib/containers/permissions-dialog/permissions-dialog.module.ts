import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroIconsModule } from 'ng-heroicons';
import { PushModule } from '@rx-angular/template/push';
import { PermissionsDialogComponent } from './permissions-dialog.component';
import { CardModule } from '@demo/shared-app/ui/card';
import { ButtonModule } from '@demo/shared-app/ui/button';
import { CheckboxFieldModule } from '@demo/shared-app/forms/checkbox-field';
import { VerticalNavModule } from '@demo/shared-app/ui/vertical-nav';

@NgModule({
  declarations: [PermissionsDialogComponent],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    CheckboxFieldModule,
    VerticalNavModule,
    HeroIconsModule,
    PushModule
  ],
})
export class PermissionsDialogModule {}
