import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'demo-spinner-progress',
  templateUrl: './spinner-progress.component.html',
  styleUrls: ['./spinner-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerProgressComponent implements OnInit {
  public get isPrimary() {
    return this._hasHostAttributes('primary');
  }

  public get isReversePrimary() {
    return this._hasHostAttributes('reverse-primary');
  }

  public get isAccent() {
    return this._hasHostAttributes('accent');
  }

  public get isReverseAccent() {
    return this._hasHostAttributes('reverse-accent');
  }

  public get isNeutral() {
    return this._hasHostAttributes('neutral');
  }

  public get isDanger() {
    return this._hasHostAttributes('danger');
  }  

  constructor(
    public readonly elementRef: ElementRef,
    public readonly _cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._cd.markForCheck();
  }

  private _hasHostAttributes(...attributes: string[]) {
    return attributes.some((attribute) =>
      this.elementRef.nativeElement.hasAttribute(attribute)
    );
  }
}
