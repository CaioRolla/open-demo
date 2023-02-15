import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'demo-content-over-content',
  templateUrl: './content-over-content.component.html',
  styleUrls: ['./content-over-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate(300, style({ opacity: 1 }))
        ]),
        transition(':leave', [
            animate(300, style({ opacity: 0 }))
        ])
    ])
]
})
export class ContentOverContentComponent  {

  @Input() displayOverContent!: boolean;

}
