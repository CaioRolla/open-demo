import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import _ from 'lodash';

@Component({
  selector: 'demo-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageUploadComponent {
  @ViewChild('input') input?: ElementRef;

  private readonly _file$ = new BehaviorSubject<string | null>(null);

  public readonly displayPreview$ = this._file$.pipe(map((file) => !!file));

  public readonly previewFileBase64$ = this._file$.pipe(
    map((base64) =>
      base64 ? this._sanitizer.bypassSecurityTrustResourceUrl(base64) : null
    )
  );

  @Input() set fileUrl(url: string | null) {
    if (url) {
      this.generateFromUrl(url);
    } else {
      this._file$.next(null);
    }
  }

  @Input() set fileBase64(base64: string | null) {
    this._file$.next(base64);
  }

  @Input() optional = false;

  @Input() hasError = false;

  @Input() titleText?: string;

  @Output() fileBase64Change = this._file$.pipe(
    distinctUntilChanged((a, b) => _.isEqual(a, b))
  );

  constructor(private readonly _sanitizer: DomSanitizer) {}

  public handleFileInputChange(event?: Event) {
    const target = event?.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;

    if (!file) {
      this._file$.next(null);
    }

    const reader = new FileReader();

    reader.readAsDataURL(file as Blob);

    reader.onload = () => {
      this._file$.next(reader.result as string);
    };
  }

  public clear(): void {
    this._file$.next(null);
    if (this.input) {
      this.input.nativeElement.value = '';
    }
  }

  public generateFromUrl(url: string): void {
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);

      const dataURL = canvas.toDataURL('image/png');

      this._file$.next(dataURL);
    };

    }
}
