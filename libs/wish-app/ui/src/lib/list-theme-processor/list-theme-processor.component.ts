import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  PLATFORM_ID,
} from '@angular/core';

import { GetAllProductDto, ListTheme, PublicGetAllPublicProductDto } from '@demo/wish-shared/core';

@Component({
  selector: 'demo-list-theme-processor',
  templateUrl: './list-theme-processor.component.html',
  styleUrls: ['./list-theme-processor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListThemeProcessorComponent implements OnInit {
  public readonly navigatorShare = !!navigator.share;
  // public readonly navigatorShare = true;

  @Input() isPreview = false;

  @Input() name!: string;

  @Input() slug!: string;

  @Input() desc!: string | null;

  @Input() bannerUrl!: string | null;

  @Input() profileUrl!: string | null;

  @Input() pix!: string | null;

  @Input() eventLocation!: string | null;

  @Input() eventDate!: Date | null;

  private _theme!: ListTheme;

  @Input() set theme(theme: ListTheme) {
    this._theme = theme;

    if (isPlatformBrowser(this._platformId)) {
      const root = this.document.querySelector(':root') as HTMLElement;

      root.style.setProperty('--theme-background', theme.background);
      root.style.setProperty('--theme-color', theme.color);
      root.style.setProperty('--theme-border-color', theme.borderColor);
    }
  }

  public get theme() {
    return this._theme;
  }

  @Input() products!: PublicGetAllPublicProductDto[];

  @Input() selectingProductId: string | null = null;

  @Input() personEmail: string | null = null;

  @Output() pixClicked = new EventEmitter<string>();

  @Output() productSelected = new EventEmitter<string>();

  @Output() productUnselected = new EventEmitter<string>();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private readonly _platformId: Object
  ) {}

  ngOnInit(): void {}

  // selectingProductId && selectingProductId !== product.id

  public productSelectedEvent(productId: string) {
    if (this.selectingProductId && this.selectingProductId !== productId) {
      return;
    }

    this.productSelected.emit(productId);
  }

  public productUnselectedEvent(productId: string) {
    if (this.selectingProductId && this.selectingProductId !== productId) {
      return;
    }

    this.productUnselected.emit(productId);
  }

  public async onShareClicked() {
    if (!this.isPreview) {
      try {
        await navigator.share({
          url: `https://listaideal.com.br/${this.slug}`,
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
}
