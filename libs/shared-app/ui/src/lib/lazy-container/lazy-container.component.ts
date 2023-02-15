import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Injector,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { ComponentTemplateFactory, exists, lazyLoadComponentFactory } from './lazy-container.util';

@Component({
  selector: 'scorpion-lazy-container',
  templateUrl: './lazy-container.component.html',
  styleUrls: ['./lazy-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LazyContainerComponent implements AfterViewInit {
  /**
   * promise that should return lazy loaded component/module into the container template
   */
  @Input() set templateFactory(value: ComponentTemplateFactory | undefined) {
    this._templateFactory$.next(value);
  }

  private _templateFactory$ = new BehaviorSubject<ComponentTemplateFactory | undefined>(undefined);

  get templateFactory() {
    return this._templateFactory$.value;
  }
  /**
   * template ref of the loading template you want to use while lazy loading the feature into the container
   */
  @Input() loadingTemplate!: TemplateRef<HTMLElement>;
  /**
   * input to toggle between min-height:100% and height:100%
   * this allows you to pass height through to the child elements(created for charts)
   */
  @Input() setHeight = false;
  @HostBinding('class') get addHeightClass() {
    if (!this.setHeight) return 'min-f-full';
    return 'h-full';
  }
  /**
   * whether template factory has finished loading.
   */
  @Output()
  loaded = new EventEmitter<void>();

  @ViewChild('featureContainer', { read: ViewContainerRef }) featureContainer!: ViewContainerRef;
  private _loadComponent = lazyLoadComponentFactory(this.injector);
  private afterViewInit$ = new Subject<void>();
  private lazyLoaded$ = this.afterViewInit$.pipe(
    filter(() => this.templateFactory !== undefined),
    switchMap(() => this.waitUntilVisible(this.el.nativeElement, '50px')),
    switchMap(() => this._templateFactory$),
    filter(exists),
    switchMap((template) => this._loadComponent(this.featureContainer, template)),
    map(() => true),
    tap(() => this.loaded.emit())
  );

  loading$ = this.lazyLoaded$.pipe(
    map((loaded) => !loaded),
    startWith(true)
  );

  constructor(private injector: Injector, private el: ElementRef) {}

  ngAfterViewInit() {
    this.afterViewInit$.next();
  }

  private waitUntilVisible(el: HTMLElement, rootMargin: string) {
    return new Observable((observer) => {
      let io: IntersectionObserver;
      if (window.IntersectionObserver) {
        io = new window.IntersectionObserver(
          (data: IntersectionObserverEntry[]) => {
            if (data.some((x) => x.isIntersecting)) {
              if (io) {
                io.disconnect();
              }
              observer.next();
            }
          },
          { rootMargin }
        );
        io.observe(el);
      } else {
        // IntersectionObserver not supported so fallback to showing it
        observer.next();
      }
      return () => io && io.disconnect();
    });
  }
}
