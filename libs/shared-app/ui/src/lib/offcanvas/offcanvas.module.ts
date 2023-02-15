import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffcanvasComponent } from './offcanvas.component';
import { OffCanvasService } from './offcanvas.service';
import { DemoOffCanvas } from './demo-offcanvas';

@NgModule({
  declarations: [
    OffcanvasComponent
  ],
  imports: [
    CommonModule
  ]
})
export class OffcanvasModule { 

  static forRoot(): ModuleWithProviders<OffcanvasModule> {
    return {
      ngModule: OffcanvasModule,
      providers: [
        OffCanvasService,
        DemoOffCanvas
      ]
    };
  }

}
