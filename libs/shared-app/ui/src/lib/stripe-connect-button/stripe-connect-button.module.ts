import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripeConnectButtonComponent } from './stripe-connect-button.component';



@NgModule({
  declarations: [
    StripeConnectButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StripeConnectButtonComponent
  ]
})
export class StripeConnectButtonModule { }
