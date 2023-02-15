import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, InjectionToken, Injector, PLATFORM_ID, StaticProvider } from '@angular/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { DialogRef } from './dialog-ref';

export const NUI_DIALOG_DATA = new InjectionToken<any>('NUI_DIALOG_DATA');

let overlayRef: OverlayRef | undefined;

@Injectable()
export class Dialog {
  private _onCloseSubject = new Subject<any>();

  constructor(
    @Inject(DOCUMENT) private readonly _document: Document,
    @Inject(PLATFORM_ID) private readonly _platformId: Object,
    private readonly _overlay: Overlay,
    private readonly _injector: Injector
  ) {}

  public create(
    component: ComponentType<any>,
    config?: OverlayConfig & { data?: any; disableClose?: boolean }
  ): DialogRef {
    if (!isPlatformBrowser(this._platformId)) {
      return {
        close: () => {},
        afterClosed: () => this._onCloseSubject.pipe(take(1)),
      };
    }
    if (overlayRef) {
      throw new Error('Dialog is already open');
    }
    const injectionTokens = new WeakMap();

    injectionTokens.set(NUI_DIALOG_DATA, config?.data);

    const providers: StaticProvider[] = [{ provide: NUI_DIALOG_DATA, useValue: config?.data }];

    const injector = Injector.create({ parent: this._injector, providers });

    const positionStrategy = this._overlay.position().global().centerHorizontally().centerVertically();

    overlayRef = this._overlay.create({
      hasBackdrop: true,
      scrollStrategy: this._overlay.scrollStrategies.block(),
      positionStrategy,
      backdropClass: [...(config?.backdropClass || []), config?.disableClose ? 'dialog-disable-backdrop-click' : ''],
      ...(config ? config : {}),
    });

    const portal = new ComponentPortal(component, null, injector);
    overlayRef.attach(portal);

    this._document.body.style.overflowY = 'hidden';

    overlayRef
      .backdropClick()
      .pipe(take(1))
      .subscribe((_) => this.close());

    return {
      close: () => this.close(),
      afterClosed: () => this._onCloseSubject.pipe(take(1)),
    };
  }

  public close(data?: any): void {
    this._onCloseSubject.next(data);
    overlayRef?.dispose();
    overlayRef = undefined;
    this._document.body.style.overflowY = 'auto';
  }
}
