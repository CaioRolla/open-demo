import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { UiFacade } from '@demo/shared-app/ui/+state';
import { Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { PublicListFacade } from '../+state/public-list.facade';

@Injectable()
export class LoadListResolver implements Resolve<boolean> {
  constructor(
    private readonly _publicListFacade: PublicListFacade,
    private readonly _meta: Meta,
    private readonly _uiFacade: UiFacade
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const listSlug = route.params['listSlug'];

    this._publicListFacade.loadList(listSlug);

    return this._publicListFacade.list$.pipe(
      filter((v) => !!v),
      take(1),
      tap((list) => {
        if (list) {
          const title = list.name;
          const description = list.desc;

          const image = list.bannerUrl;

          this._uiFacade.setPageTitle(title);

          if (description) {
            this._meta.removeTag('name="description"');
            this._meta.removeTag('name="twitter:description"');
            this._meta.removeTag('property="og:description"');
            this._meta.addTags([
              { name: 'description', content: description },
              { property: 'og:description', content: description },
              { name: 'twitter:description', content: description },
            ]);
          }

          if (image) {
            this._meta.removeTag('property="og:image"');
            this._meta.removeTag('property="og:image:width"');
            this._meta.removeTag('property="og:image:height"');
            this._meta.removeTag('name="twitter:image"');
            this._meta.removeTag('name="twitter:image:alt"');
            this._meta.addTags([
              { property: 'og:image', content: image },
              { name: 'twitter:image', content: image },
              { name: 'twitter:image:alt', content: title },
            ]);
          }

        }
      }),
      map((l) => !!l)
    );
  }
}
