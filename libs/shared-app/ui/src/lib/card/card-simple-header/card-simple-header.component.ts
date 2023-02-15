import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'demo-card-simple-header',
  templateUrl: './card-simple-header.component.html',
  styleUrls: ['./card-simple-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardSimpleHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
