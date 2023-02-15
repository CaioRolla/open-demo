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
import { NUI_OFFCANVAS_DATA, NUI_OFFCANVAS_CONTAINER_REF } from './constants';
import { ComponentType, OffCanvasConfig } from './interfaces';

import { OffcanvasComponent } from './offcanvas.component';

@Injectable()
export class OffCanvasService {
  private _offCanvasRef = this._componentFactoryResolver
    .resolveComponentFactory(OffcanvasComponent)
    .create(this._injector);

  constructor(
    private readonly _componentFactoryResolver: ComponentFactoryResolver,
    private readonly _applicationRef: ApplicationRef,
    private readonly _injector: Injector
  ) {
    this._init();
  }

  private _init(): void {
    this._applicationRef.attachView(this._offCanvasRef.hostView);

    const domElem = (this._offCanvasRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);
  }

  public open<T = any>(
    component: ComponentType<T>,
    onCloseFn: (data?:any) => void,
    config?: OffCanvasConfig,
    moduleRef?: NgModuleRef<any>
  ): ComponentRef<T> {

    const cfr = moduleRef ? moduleRef.componentFactoryResolver : this._componentFactoryResolver;

    let onCloseData: any;

    const providers: StaticProvider[] = [
      {provide: NUI_OFFCANVAS_CONTAINER_REF, useValue: {
        close: (data: any) => { 
          onCloseData = data;
          this._offCanvasRef.instance.close();
        }
      }},
      { provide: NUI_OFFCANVAS_DATA, useValue: config?.data },
    ];
    

    const injector = Injector.create({ parent: this._injector, providers });

    const componentFactory = cfr.resolveComponentFactory(component);

    this._offCanvasRef.instance.contentRef?.clear();

    const componentRef =
      this._offCanvasRef.instance.contentRef?.createComponent(
        componentFactory,
        0,
        injector
      ) as ComponentRef<T>;

    this._offCanvasRef.instance.open(() => {
      this._offCanvasRef.instance.contentRef?.clear();
      onCloseFn(onCloseData)
    });

    return componentRef;
  }

  public close(): void {
    this._offCanvasRef.instance.close();
  }
}
