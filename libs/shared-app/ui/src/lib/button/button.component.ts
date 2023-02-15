import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector:
    '[demo-button],[demo-primary-button],[demo-danger-button],[demo-secondary-button],[demo-warning-button],[demo-reverse-primary-button],[demo-text-primary-button],[demo-text-danger-button],[demo-text-neutral-button],[demo-accent-button],[demo-reverse-accent-button],[demo-reverse-warning-button],[demo-text-accent-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  host: {
    class: 'button',
    '[class.button--primary]': 'isPrimary',
    '[class.button--secondary]': 'isSecondary',
    '[class.button--warning]': 'isWarning',
    '[class.button--danger]': 'isDanger',
    '[class.button--accent]': 'isAccent',
    '[class.button--reverse-primary]': 'isReversePrimary',
    '[class.button--reverse-warning]': 'isReverseWarning',
    '[class.button--reverse-accent]': 'isReverseAccent',
    '[class.button--text-primary]': 'isTextPrimary',
    '[class.button--text-danger]': 'isTextDanger',
    '[class.button--text-neutral]': 'isTextNeutral',
    '[class.button--text-accent]': 'isTextAccent',
    '[class.button--neutral]': 'isNeutral',
    '[class.button--loading]': 'loading',
    '[class.button--animation-enabled]': 'animationEnabled',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent implements OnInit, AfterViewInit {
  public animationEnabled = false;

  @Input() public loading = false;

  public readonly isPrimary = this._hasHostAttributes('demo-primary-button');
  public readonly isSecondary = this._hasHostAttributes('demo-secondary-button');
  public readonly isWarning = this._hasHostAttributes('demo-warning-button');
  public readonly isDanger = this._hasHostAttributes('demo-danger-button');
  public readonly isReversePrimary = this._hasHostAttributes(
    'demo-reverse-primary-button'
  );
  public readonly isReverseWarning = this._hasHostAttributes(
    'demo-reverse-warning-button'
  );
  public readonly isTextPrimary = this._hasHostAttributes(
    'demo-text-primary-button'
  );
  public readonly isTextDanger = this._hasHostAttributes(
    'demo-text-danger-button'
  );
  public readonly isTextNeutral = this._hasHostAttributes(
    'demo-text-neutral-button'
  );
  public readonly isAccent = this._hasHostAttributes('demo-accent-button');
  public readonly isReverseAccent = this._hasHostAttributes(
    'demo-reverse-accent-button'
  );
  public readonly isTextAccent = this._hasHostAttributes(
    'demo-text-accent-button'
  );
  public readonly isNeutral = this._hasHostAttributes('demo-button');

  constructor(
    public readonly elementRef: ElementRef,
    public readonly _cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animationEnabled = true;
      this._cd.markForCheck();
    }, 200);
  }

  private _hasHostAttributes(...attributes: string[]) {
    return attributes.some((attribute) =>
      this.elementRef.nativeElement.hasAttribute(attribute)
    );
  }
}
