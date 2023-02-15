import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetService } from './services/asset.service';
import { AssetAppConfig } from './asset-app.config';

@NgModule({
  imports: [CommonModule],
  declarations: [

  ],
  providers: [AssetService],
  exports: [],
})
export class AssetAppModule {
  static forRoot(config: AssetAppConfig): ModuleWithProviders<AssetAppModule> {
    return {
      ngModule: AssetAppModule,
      providers: [{ provide: AssetAppConfig, useValue: config }],
    };
  }
}
