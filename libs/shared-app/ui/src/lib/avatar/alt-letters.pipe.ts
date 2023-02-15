import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'altLetters'
})
export class AltLettersPipe implements PipeTransform {

  transform(alt: string | null): unknown {
    if(!alt) return '';

    const clean = alt.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').toUpperCase();

    const splitted = clean.split(' ');

    if(splitted.length >= 2){
      return `${splitted[0][0]}${splitted[1][0]}`;
    }

    if(clean.length >= 2){
      return `${clean[0]}${clean[1]}`
    }

    return clean[0];

  }

}
