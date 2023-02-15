import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { WishAppApplicationConfig } from './wish-app-application.config';
import { AuthTokenInterceptor } from '@demo/+auth/app/interceptors';

@NgModule({
  imports: [CommonModule],
})
export class WishAppApplicationModule {
  public static forRoot(
    config: WishAppApplicationConfig
  ): ModuleWithProviders<WishAppApplicationModule> {
    return {
      ngModule: WishAppApplicationModule,
      providers: [
        {
          provide: WishAppApplicationConfig,
          useValue: config,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthTokenInterceptor,
          multi: true,
        },
      ],
    };
  }
}
