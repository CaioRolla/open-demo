import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileNameFormat',
})
export class FileNameFormatPipe implements PipeTransform {
  public transform(name: string) {
    return name.split('.').pop() as string;
  }
}
