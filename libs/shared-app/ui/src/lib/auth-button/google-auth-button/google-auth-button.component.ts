import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'demo-google-auth-button',
  templateUrl: './google-auth-button.component.html',
  styleUrls: ['./google-auth-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoogleAuthButtonComponent implements OnInit {

  @Input() href!: string;

  constructor() {}

  ngOnInit(): void {}
}
