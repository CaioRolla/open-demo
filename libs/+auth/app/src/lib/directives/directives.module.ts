import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasPermissionDirective } from './has-permission.directive';
import { NotHasPermissionDirective } from './not-has-permission.directive';
import { HasSomePermissionDirective } from './has-some-permission.directive';

@NgModule({
  declarations: [
    HasPermissionDirective,
    NotHasPermissionDirective,
    HasSomePermissionDirective,
  ],
  imports: [CommonModule],
  exports: [
    HasPermissionDirective,
    NotHasPermissionDirective,
    HasSomePermissionDirective,
  ],
})
export class AuthDirectivesModule {}
