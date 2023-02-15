import {
  trigger,
  state,
  style,
  transition,
  animate,
  query,
  group,
  animateChild,
  AnimationEvent,
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'demo-offcanvas',
  templateUrl: './offcanvas.component.html',
  styleUrls: ['./offcanvas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('appear', [
      // ...
      state(
        'open',
        style({
          zIndex: 99,
        })
      ),
      state(
        'closed',
        style({
          zIndex: -1,
        })
      ),
      transition(
        'open => closed',
        group([
          query('@shadow', animateChild()),
          query('@content', animateChild()),
          animate('.3s'),
        ])
      ),
    ]),
    trigger('shadow', [
      state(
        'open',
        style({
          opacity: .7
        })
      ),
      state(
        'closed',
        style({
          opacity: 0
        })
      ),
      transition('open => closed', [animate('.3s ease-in-out')]),
      transition('closed => open', [animate('.3s ease-in-out')]),
    ]),
    trigger('content', [
      state(
        'open',
        style({
          transform: 'translateX(0%)'
        })
      ),
      state(
        'closed',
        style({
          transform: 'translateX(calc(100% + 1px))'
        })
      ),
      transition('open => closed', [animate('.3s ease-in-out')]),
      transition('closed => open', [animate('.3s ease-in-out')]),
    ]),
  ],
})
export class OffcanvasComponent implements OnInit {
  private readonly _open$ = new BehaviorSubject<boolean>(false);

  public readonly open$ = this._open$.asObservable();

  public readonly state$ = this.open$.pipe(
    map((open) => (open ? 'open' : 'closed'))
  );

  public onAnimationFinished?: () => void

  @ViewChild('content', { read: ViewContainerRef })
  contentRef?: ViewContainerRef;

  constructor(
    @Inject(DOCUMENT) private readonly _document: Document
  ) {}

  ngOnInit(): void {}

  public open(onAnimationFinished?: () => void): void {
    this._open$.next(true);
    this.onAnimationFinished = onAnimationFinished;
  }

  public close(): void {
    this._open$.next(false);
  }

  public animationStarted(event: AnimationEvent): void {
    if(event.toState === 'open'){
      this._document.body.style.overflowY = 'hidden';
    } else {
      this._document.body.style.overflowY = 'auto';
    } 
  }

  public animationFinished(event: AnimationEvent): void {
    if(this.onAnimationFinished && !this._open$.value){
      this.onAnimationFinished();
    }
  }
}
