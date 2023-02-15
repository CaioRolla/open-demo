import {
  animate,
  animateChild,
  group,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeroIconName } from 'ng-heroicons';
import {
  BehaviorSubject,
  distinctUntilChanged,
  filter,
  Subscription,
} from 'rxjs';
import { DemoColorScheme } from '../../interfaces';
import { SnackbarPosition } from '../interfaces';

@Component({
  selector: 'demo-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  animations: [
    trigger('appear', [
      state(
        'true',
        style({
          transform: 'translateY(0)',
        })
      ),
      transition('* => true', [
        animate('.3s ease-in-out'),
        // group([query('@expand', animateChild()), animate('.3s ease-in-out')]),
      ]),
      transition('true => *', [
        animate('.3s .5s ease-in-out'),
        // group([query('@expand', animateChild()), animate('.3s .5s ease-in-out')]),
      ]),
    ]),
    // trigger('expand', [
    //   state(
    //     'true',
    //     style({
    //       width: '300px',
    //     })
    //   ),
    //   state(
    //     'false',
    //     style({
    //       width: '0px',
    //     })
    //   ),
    //   transition('* => true', [animate('.5s .3s ease-in-out')]),
    //   transition('* => false', [animate('.5s ease-in-out')]),
    // ]),
  ],
})
export class SnackbarComponent implements OnDestroy {
  public readonly _subscription = new Subscription();

  public icon: HeroIconName | undefined;

  public message?: string;

  public position: SnackbarPosition = 'bottom-right';

  public index = 0;
  public color: DemoColorScheme = 'primary';

  private readonly _open$ = new BehaviorSubject(true);

  public readonly open$ = this._open$.asObservable();

  public readonly animationActive$ = new BehaviorSubject<boolean>(false);

  public onClose?: (index: number) => void;

  constructor() {
    const sub = this.animationActive$
      .pipe(
        distinctUntilChanged(),
        filter((active) => !active)
      )
      .subscribe(() => {
        this.animationFinished();
      });
    this._subscription.add(sub);
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public close(onClose?: () => void): void {
    this.onClose = onClose;
    this._open$.next(false);
  }

  public animationFinished(): void {
    if (this.onClose && !this._open$.value) {
      this.onClose(this.index);
    }
  }
}
