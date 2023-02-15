import {
  Directive,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Directive({
  selector: '[notIsMobile]',
})
export class NotIsMobileDirective implements OnInit {
  constructor(
    private deviceService: DeviceDetectorService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit() {
    if (!this.deviceService.isMobile()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
