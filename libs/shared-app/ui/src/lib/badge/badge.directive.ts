import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[demoBadge]',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'demo-badge',
  },
})
export class BadgeDirective implements OnInit, OnDestroy {
  @Input('demoBadge')
  get content(): string | number | undefined | null {
    return this._content;
  }
  set content(newContent: string | number | undefined | null) {
    this._updateRenderedContent(newContent);
  }
  private _content: string | number | undefined | null;

  /** Visible badge element. */
  private _badgeElement: HTMLElement | undefined;

  /** Whether the OnInit lifecycle hook has run yet */
  private _isInitialized = false;

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef<HTMLElement>
  ) {}

  public ngOnInit(): void {
    if (this.content && !this._badgeElement) {
      this._badgeElement = this._createBadgeElement();
      this._updateRenderedContent(this.content);
    }

    this._isInitialized = true;
  }

  public ngOnDestroy(): void {
    // ViewEngine only: when creating a badge through the Renderer, Angular remembers its index.
    // We have to destroy it ourselves, otherwise it'll be retained in memory.
    if (this._renderer.destroyNode) {
      this._renderer.destroyNode(this._badgeElement);
    }
  }

  private _updateRenderedContent(
    newContent: string | number | undefined | null
  ): void {
    const newContentNormalized: string = `${newContent ?? ''}`.trim();

    // Don't create the badge element if the directive isn't initialized because we want to
    // append the badge element to the *end* of the host element's content for backwards
    // compatibility.
    if (this._isInitialized && newContentNormalized && !this._badgeElement) {
      this._badgeElement = this._createBadgeElement();
    }

    if (this._badgeElement) {
      this._badgeElement.textContent = newContentNormalized;
    }

    this._content = newContentNormalized;
  }

  private _createBadgeElement(): HTMLElement {
    const badgeElement = this._renderer.createElement('span');

    badgeElement.classList.add('demo-badge__content');

    // badgeElement.setAttribute('id', `mat-badge-content-${this._id}`);

    this._elementRef.nativeElement.appendChild(badgeElement);

    return badgeElement;
  }
}
