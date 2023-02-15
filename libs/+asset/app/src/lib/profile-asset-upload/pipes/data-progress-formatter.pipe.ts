import { Pipe, PipeTransform } from '@angular/core';
import { FileData } from '../data';

import prettyBytes from 'pretty-bytes';

@Pipe({
  name: 'dataProgressFormatter',
})
export class DataProgressFormatterPipe implements PipeTransform {
  transform(data: FileData, ...args: unknown[]): unknown {
    return `${prettyBytes(data.loaded)} of ${prettyBytes(data.total)}`;
  }
}
