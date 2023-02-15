import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ContentChildren,
  AfterContentInit,
  QueryList,
  OnDestroy,
  AfterViewInit,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, Subscription } from 'rxjs';
import {
  delay,
  filter,
  map,
  pairwise,
  shareReplay,
  startWith,
  tap,
} from 'rxjs/operators';

import { TabHeaderComponent } from './tab-header/tab-header.component';
import { TabComponent } from './tab/tab.component';

@Component({
  selector: 'demo-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabGroupComponent
  implements AfterContentInit, OnDestroy, AfterViewInit
{
  private readonly _subscription = new Subscription();

  @Input() public card = false;

  @ContentChildren(TabHeaderComponent)
  private _headers?: QueryList<TabHeaderComponent>;
  @ContentChildren(TabComponent) private _tabs?: QueryList<TabComponent>;


  ngAfterContentInit(): void {
    this._listenToTabChange();
  }

  ngAfterViewInit(): void {
    const tab = this._tabs?.get(0);
    const header = this._headers?.get(0);
    if (tab) {
      setTimeout(() => {
        tab?.show();
        header?.select();
      });
    }
  }

  private _listenToTabChange(): void {
    const subs = this._headers?.map((header) =>
      header.clickEvent.subscribe(() => {
        this._headers?.forEach((h) => h.unselect());

        const tab = this._tabs?.find((t) => t.tabId === header.tabId);
        
        this._tabs?.forEach((h) => h.hide());
        
        tab?.show();
        header.select();
      })
    );
    subs?.forEach((sub) => this._subscription.add(sub));
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
