import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { PrettyBytesPipe } from './pipes/pretty-bytes.pipe';
import { FileNameFormatPipe } from './pipes/file-name-format.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { GravatarPipe } from './pipes/gravatar.pipe';
import { IsMobileDirective } from './directives/is-mobile.directive';
import { NotIsMobileDirective } from './directives/not-is-mobile.directive';
import { ExtensionFromMimePipe } from './pipes/extension-from-mime.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    SafeUrlPipe,
    PrettyBytesPipe,
    FileNameFormatPipe,
    TruncatePipe,
    GravatarPipe,
    IsMobileDirective,
    NotIsMobileDirective,
    ExtensionFromMimePipe
  ],
  exports: [
    SafeUrlPipe,
    PrettyBytesPipe,
    FileNameFormatPipe,
    TruncatePipe,
    GravatarPipe,
    IsMobileDirective,
    NotIsMobileDirective,
    ExtensionFromMimePipe
  ],
  providers: [
    SafeUrlPipe,
    PrettyBytesPipe,
    FileNameFormatPipe,
    TruncatePipe,
    GravatarPipe,
    ExtensionFromMimePipe
  ],
})
export class SharedAppUtilsModule {}
