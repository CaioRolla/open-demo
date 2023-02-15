import { Pipe, PipeTransform } from '@angular/core';

import MD5 from 'crypto-js/md5';

@Pipe({
  name: 'gravatar',
})
export class GravatarPipe implements PipeTransform {
  transform(value: string): string {
    return 'http://www.gravatar.com/avatar/' + MD5(value).toString() + '?d=404';
  }
}
