import { OnInit, HostListener, Output, EventEmitter, Input, ElementRef, Directive } from '@angular/core';

@Directive()
export class BaseInputComponent implements OnInit {
  public hasSuffix = false;
  public hasPrefix = false;
  public isDisabled = false;
  public hasError = false;

  @Output() focusChange = new EventEmitter<boolean>();
  @Output() disableChange = new EventEmitter<boolean>();
  @Output() hasErrorChange = new EventEmitter<boolean>();

  constructor(private readonly _elementRef: ElementRef) {}

  ngOnInit(): void {
    if (typeof MutationObserver !== 'undefined') {
      const element = this._elementRef.nativeElement;

      const changes = new MutationObserver((mutations: MutationRecord[]) => {
        mutations.forEach((mutation: MutationRecord) => {
          const classList = this._elementRef.nativeElement.classList;
          const hasError = classList.contains('ng-invalid') && classList.contains('ng-touched');
          if (this.hasError !== hasError) {
            this.hasError = hasError;
            this.hasErrorChange.emit(hasError);
          }
        });
      });

      changes.observe(element, {
        attributes: true,
      });
    }
  }

  @HostListener('focusin')
  public onFocusEvent(): void {
    this.focusChange.emit(true);
  }

  @HostListener('focusout')
  public onFocusoutEvent(): void {
    this.focusChange.emit(false);
  }

  @Input('disabled')
  public set onDisableChange(disabled: string | boolean) {
    this.isDisabled = disabled === '' || disabled === 'false' || disabled === true;
    this.disableChange.emit(this.isDisabled);
  }
}
