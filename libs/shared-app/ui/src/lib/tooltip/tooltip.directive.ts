import {
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import {
  ConnectedPosition,
  Overlay,
  OverlayPositionBuilder,
  OverlayRef,
} from '@angular/cdk/overlay';
import { Subscription } from 'rxjs';
import { ComponentPortal } from '@angular/cdk/portal';
import { TooltipComponent } from './tooltip/tooltip.component';

@Directive({
  selector: '[demoTooltip]',
})
export class TooltipDirective implements OnInit, OnDestroy {
  private readonly _subscriptions = new Subscription();

  private _disabled = false;

  @Input('demoTooltip') content: string | TemplateRef<any> = '';
  @Input('demoTooltipDisabled') set disabled(value: boolean) {
    this._disabled = value;
    if(value && this._overlayRef ){
      this._overlayRef.detach();
    }
  }
  get disabled(): boolean {
    return this._disabled;
  }
  @Input('demoTooltipType') type: 'dark' | 'light' = 'dark';
  @Input('demoTooltipOffset') offset = 8;
  @Input('demoTooltipPosition') position: 'top' | 'bottom' | 'start' | 'end' =
    'top';

  private _overlayRef?: OverlayRef;

  constructor(
    private readonly _overlay: Overlay,
    private readonly _overlayPositionBuilder: OverlayPositionBuilder,
    private readonly _elementRef: ElementRef
  ) {}

  public ngOnInit(): void {
    const positionStrategy = this._overlayPositionBuilder
      .flexibleConnectedTo(this._elementRef)
      .withPositions([this._buildPosition()]);

    this._overlayRef = this._overlay.create({ positionStrategy });

    this._elementRef.nativeElement.addEvent;
  }

  public ngOnDestroy(): void {
    if(this._overlayRef ){
      this._overlayRef.detach();
    }
  }

  @HostListener('mouseenter')
  public show(): void {
    if (this.disabled) {
      return;
    }

    if (this._overlayRef && !this._overlayRef?.hasAttached()) {
      const tooltipRef = this._overlayRef.attach(
        new ComponentPortal(TooltipComponent)
      );

      tooltipRef.instance.type = this.type;

      if (typeof this.content === 'string') {
        tooltipRef.instance.text = this.content;
      } else {
        tooltipRef.instance.template = this.content;
      }
    }
  }

  @HostListener('mouseout', ['$event'])
  public hide(event: any): void {
    if (this.disabled) {
      return;
    }

    if (
      this._overlayRef &&
      !this._elementRef.nativeElement.contains(event.toElement)
    ) {
      this._overlayRef.detach();
    }
  }

  private _buildPosition(): ConnectedPosition {
    switch (this.position) {
      case 'bottom':
        return {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
          offsetY: this.offset,
        };

      case 'end':
        return {
          originX: 'end',
          originY: 'center',
          overlayX: 'start',
          overlayY: 'center',
          offsetX: this.offset,
        };

      case 'start':
        return {
          originX: 'start',
          originY: 'center',
          overlayX: 'end',
          overlayY: 'center',
          offsetX: -this.offset,
        };

      default:
        return {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetY: -this.offset,
        };
    }
  }
}
