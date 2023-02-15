import { Component, OnInit, ChangeDetectionStrategy, TemplateRef, HostBinding, HostListener } from '@angular/core';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'demo-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('menu', [
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
export class MenuComponent implements OnInit {

  @HostBinding('@menu') public menu = true;

  public template?: TemplateRef<any>;


  constructor() { }

  ngOnInit(): void {
  }

}
