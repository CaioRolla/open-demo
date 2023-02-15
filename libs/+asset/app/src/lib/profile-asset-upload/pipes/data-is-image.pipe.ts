import { Pipe, PipeTransform } from '@angular/core';
import { FileData } from '../data';

@Pipe({
  name: 'dataIsImage',
})
export class DataIsImagePipe implements PipeTransform {
  transform(data: FileData, ...args: unknown[]): boolean {
    return ['jpg', 'jpeg', 'png', 'gif'].includes(data.extension) && !!data.asset;
  }
}
