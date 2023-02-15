import { Pipe, PipeTransform } from '@angular/core';

import prettyBytes from 'pretty-bytes';

@Pipe({
  name: 'prettyBytes',
})
export class PrettyBytesPipe implements PipeTransform {
  public transform(bytes: number) {
    return prettyBytes(bytes);
  }
}
