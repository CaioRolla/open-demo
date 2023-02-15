import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationListComponent } from './notification-list.component';

@NgModule({
  declarations: [NotificationListComponent],
  imports: [
    CommonModule,

  ],
  exports: [NotificationListComponent],
  providers: [],
})
export class NotificationListModule {}
