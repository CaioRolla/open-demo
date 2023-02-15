import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { Subscription } from 'rxjs';

import { <%= className %>Facade } from '../+state/<%= fileName %>.facade';

@Component({
  selector: 'demo-<%= fileName %>',
  templateUrl: './<%= fileName %>.component.html',
  styleUrls: ['./<%= fileName %>.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class <%= className %>Component implements OnDestroy, OnInit {

  private readonly _subscriptions = new Subscription();

  constructor(
    private readonly _<%= propertyName %>Facade: <%= className %>Facade
  ){ }

  public ngOnInit(): void {
    
  }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this._<%= propertyName %>Facade.resetState();
  }

}
