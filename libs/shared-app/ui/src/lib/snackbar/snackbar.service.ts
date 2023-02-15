import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  NgModuleRef,
  StaticProvider,
} from '@angular/core';
import { UiFacade } from '../+state';
import { SnackbarConfig } from './interfaces';
import { SnackbarComponent } from './snackbar/snackbar.component';

@Injectable()
export class SnackbarService {
  private _snackRef: ComponentRef<SnackbarComponent>[] = [];

  constructor(
    private readonly _componentFactoryResolver: ComponentFactoryResolver,
    private readonly _applicationRef: ApplicationRef,
    private readonly _injector: Injector,
    private readonly _uiFacade: UiFacade
  ) {}

  public open(config: SnackbarConfig): void {
    const snackRef = this._componentFactoryResolver
      .resolveComponentFactory(SnackbarComponent)
      .create(this._injector);

    const index = this._snackRef.push(snackRef) - 1;

    snackRef.instance.message = config.message;
    snackRef.instance.icon = config.icon;
    snackRef.instance.index = index;
    if (config.position) {
      snackRef.instance.position = config.position;
    }

    if (config.color) {
      snackRef.instance.color = config.color;
    }

    this._applicationRef.attachView(snackRef.hostView);

    const domElem = (snackRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);

    setTimeout(() => {
      this._close(index);
    }, config.duration ?? 3000);
  }

  private _close(index: number): void {
    const snackRef = this._snackRef[index];
    snackRef.instance.close(() => {
      snackRef.destroy();
    });
  }
}
