import { Component, OnInit, ChangeDetectionStrategy, Input, TemplateRef, HostListener, Output, EventEmitter, HostBinding } from '@angular/core';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'demo-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('tooltip', [
      transition(':enter', [
        animate('200ms cubic-bezier(0, 0, 0.2, 1)', keyframes([
          style({opacity: 0, transform: 'scale(0)', offset: 0}),
          style({opacity: 0.5, transform: 'scale(0.99)', offset: 0.5}),
          style({opacity: 1, transform: 'scale(1)', offset: 1})
        ]))
      ]),
      transition(':leave', [
        animate('80ms cubic-bezier(0, 0, 0.2, 1)', style({opacity: 0}))
      ]),
    ]),
  ]
})
export class TooltipComponent {

  @HostBinding('@tooltip') public tooltip = true;

  public template?: TemplateRef<any>;
  public text?: string;
  public type: 'dark' | 'light' = 'dark';

}
