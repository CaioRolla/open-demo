import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import * as _ from 'lodash';
import { BehaviorSubject, combineLatest, Subject, Subscription } from 'rxjs';
import { AuthFacade } from '../+state/auth-app.facade';

@Directive({
  selector: '[hasSomePermission]',
})
export class HasSomePermissionDirective implements OnInit, OnDestroy {
  private readonly _subscription = new Subscription();

  private readonly _permissions$ = new BehaviorSubject<string[]>([]);

  private hasView = false;

  constructor(
    private readonly templateRef: TemplateRef<any>,
    private readonly viewContainer: ViewContainerRef,
    private readonly _authFacade: AuthFacade
  ) {}

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public ngOnInit(): void {
    const sub = combineLatest([
      this._permissions$,
      this._authFacade.user$,
    ]).subscribe(([permissions, user]) => {

      if (!user || !permissions) {
        if (this.hasView) {
          this.viewContainer.clear();
        }
        return;
      }

      const hasPermission = user.permissions.some(r=> permissions.includes(r));

      if (hasPermission && !this.hasView) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
      } else if (!hasPermission && this.hasView) {
        this.viewContainer.clear();
        this.hasView = false;
      }
    });

    this._subscription.add(sub);
  }

  @Input() set hasSomePermission(permissions: string[]) {
    this._permissions$.next(permissions);
  }
}
