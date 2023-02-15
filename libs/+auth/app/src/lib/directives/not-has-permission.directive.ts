import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { BehaviorSubject, combineLatest, Subject, Subscription } from 'rxjs';
import { AuthFacade } from '../+state/auth-app.facade';

@Directive({
  selector: '[notHasPermission]',
})
export class NotHasPermissionDirective implements OnInit, OnDestroy {
  private readonly _subscription = new Subscription();

  private readonly _permission$ = new BehaviorSubject<string>('');

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
      this._permission$,
      this._authFacade.user$,
    ]).subscribe(([permission, user]) => {

      if (!user || !permission) {
        if (this.hasView) {
          this.viewContainer.clear();
        }
        return;
      }

      const notHasPermission = !user.permissions.includes(permission);


      if (notHasPermission && !this.hasView) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
      } else if (!notHasPermission && this.hasView) {
        this.viewContainer.clear();
        this.hasView = false;
      }
    });

    this._subscription.add(sub);
  }

  @Input() set notHasPermission(permission: string) {
    this._permission$.next(permission);
  }
}
