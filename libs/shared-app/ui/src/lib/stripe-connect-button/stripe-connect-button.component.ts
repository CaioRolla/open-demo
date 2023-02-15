import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'demo-stripe-connect-button',
  templateUrl: './stripe-connect-button.component.html',
  styleUrls: ['./stripe-connect-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StripeConnectButtonComponent {

  @Output() public clickEvent = new EventEmitter<void>();

}
