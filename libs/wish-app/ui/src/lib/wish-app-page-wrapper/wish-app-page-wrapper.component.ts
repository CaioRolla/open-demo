import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';

import { AuthFacade } from '@demo/+auth/app';
import { filter, map } from 'rxjs';

@Component({
  selector: 'demo-wish-app-page-wrapper',
  templateUrl: './wish-app-page-wrapper.component.html',
  styleUrls: ['./wish-app-page-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishAppPageWrapperComponent implements OnInit {
  @Input() pageTitle: string = '';

  public readonly loading$ = this._router.events.pipe(
    filter((event) => {
      if (event instanceof NavigationStart) return true;
      if (event instanceof NavigationEnd) return true;
      if (event instanceof NavigationCancel) return true;
      if (event instanceof NavigationError) return true;
      return false;
    }),
    map((event) => {
      if (event instanceof NavigationEnd) return false;
      if (event instanceof NavigationCancel) return false;
      if (event instanceof NavigationError) return false;

      return true;
    })
  );

  constructor(
    private readonly _router: Router,
    public readonly authAppFacade: AuthFacade
  ) {}

  ngOnInit(): void {}
}
