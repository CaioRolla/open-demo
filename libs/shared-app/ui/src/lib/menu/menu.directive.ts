import {
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
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
import { MenuComponent } from './menu/menu.component';

@Directive({
  selector: '[demoMenu]',
})
export class MenuDirective implements OnInit, OnDestroy {
  private readonly _subscriptions = new Subscription();

  @Input('demoMenu') content?: TemplateRef<any>;

  private _overlayRef?: OverlayRef;

  private _open = false;

  @Output() menuClosed = new EventEmitter();

  constructor(
    private readonly _overlay: Overlay,
    private readonly _overlayPositionBuilder: OverlayPositionBuilder,
    private readonly _elementRef: ElementRef
  ) {}

  public ngOnInit(): void {
    const positionStrategy = this._overlayPositionBuilder
      .flexibleConnectedTo(this._elementRef)
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
          offsetY: 8,
        },
      ]);

    this._overlayRef = this._overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'transparent-backdrop',
    });

    const sub = this._overlayRef.backdropClick().subscribe(() => {
      this.hide();
    });
    this._subscriptions.add(sub);
  }

  public ngOnDestroy(): void {
    this.hide(true);
    this._subscriptions.unsubscribe();
  }

  public hide(destroy = false) {
    if (this._overlayRef) {
      this._open = false;
      this._overlayRef.detach();
      if(!destroy){
        this.menuClosed.emit();
      }
    }
  }

  public show(): void {
    if (this._overlayRef) {
      this._open = true;
      const menuRef = this._overlayRef.attach(
        new ComponentPortal(MenuComponent)
      );
      menuRef.instance.template = this.content;
    }
  }

  @HostListener('document:click', ['$event'])
  public clickout(): void {
    if (this._open) {
      this.hide();
    }
  }

  @HostListener('click')
  public onClick(): void {
    if (!this._open) {
      setTimeout(() => this.show())
    } else if (this._open) {
      this.hide();
    }
  }

  @HostListener('window:keyup.esc')
  public onEscKeyUp(): void {
    this.hide();
  }
}
