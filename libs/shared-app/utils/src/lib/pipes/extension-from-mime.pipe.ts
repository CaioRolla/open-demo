import { Pipe, PipeTransform } from '@angular/core';
// import { extension } from 'mime-types';

@Pipe({
  name: 'extensionFromMime',
})
export class ExtensionFromMimePipe implements PipeTransform {
  public transform(mime: string) {
    // return extension(mime)  || null ;
    return 'TODO'
  }
}
