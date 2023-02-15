import { Type, Injector, ViewContainerRef, createNgModuleRef } from '@angular/core';

export type ComponentTemplateFactory = () => Promise<{ component: Type<unknown>; module: Type<unknown> }>;

export function lazyLoadComponentFactory(injector: Injector) {
  return async (viewContainer: ViewContainerRef, templateFactory: ComponentTemplateFactory) => {
    viewContainer.clear();
    const template = await templateFactory();
    const moduleRef = createNgModuleRef(template.module, injector);
    const componentRef = viewContainer.createComponent(template.component, { injector, ngModuleRef: moduleRef });
    componentRef.changeDetectorRef.detectChanges();
  };
}

export function exists<T>(value: T | null | undefined): value is T {
  return value !== undefined && value !== null;
}