import { HttpModule } from '@nestjs/axios';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { ShopeeConfig } from './shopee.config';
import { ShopeeService } from './shopee.service';

@Global()
@Module({
  controllers: [],
  imports: [HttpModule],
  providers: [ShopeeService],
  exports: [ShopeeService],
})
export class ShopeeModule {
  static forRoot(config: ShopeeConfig): DynamicModule {
    return {
      module: ShopeeModule,
      providers: [
        {
          provide: ShopeeConfig,
          useValue: config,
        },
      ],
    };
  }
}
