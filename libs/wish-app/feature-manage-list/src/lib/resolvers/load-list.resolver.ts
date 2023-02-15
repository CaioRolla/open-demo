import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { ManageListFacade } from '../+state/manage-list.facade';

@Injectable()
export class LoadListResolver implements Resolve<boolean> {
  constructor(private readonly _manageListFacade: ManageListFacade) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const listId = route.params['listId'];

    this._manageListFacade.loadList(listId);

    return this._manageListFacade.list$.pipe(
      filter((v) => !!v),
      take(1),
      map((l) => !!l)
    );
  }
}
