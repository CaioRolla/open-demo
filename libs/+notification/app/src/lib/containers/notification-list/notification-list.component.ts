import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NotificationFacade } from '../../+state/notification.facade';
import { Notification } from '@demo/+notification/core';

@Component({
  selector: 'demo-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationListComponent {
  public readonly notificationsCount$ = this._notificationFacade.notificationsCount$;

  public readonly notifications$ = this._notificationFacade.notifications$;

  public trackById = (index: number, item: Notification) => {
    return item.id;
  };

  constructor(private readonly _notificationFacade: NotificationFacade) {}
}
