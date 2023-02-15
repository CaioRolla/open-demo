import { Injectable, Injector, NgModuleRef } from '@angular/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

import { ComponentType, OffCanvasConfig, OffCanvasRef } from './interfaces';
import { OffCanvasService } from './offcanvas.service';

@Injectable()
export class DemoOffCanvas {
  constructor(private readonly _offCanvasService: OffCanvasService) {}

  public open<T = any>(component: ComponentType<T>, config?: OffCanvasConfig, moduleRef?: NgModuleRef<any>): OffCanvasRef {
    
    const onCloseSubject = new Subject();

    const onCloseCallback = (data?: any) => {
      onCloseSubject.next(data)
    }

    this._offCanvasService.open(component, onCloseCallback, config, moduleRef);

    return  {
      close: () => this.close(),
      afterClosed: () => onCloseSubject.pipe(take(1))
    }
  }
  
  public close(): void {
    this._offCanvasService.close();
  }
}
