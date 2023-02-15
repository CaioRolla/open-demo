import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleAuthButtonComponent } from './google-auth-button/google-auth-button.component';

@NgModule({
  declarations: [GoogleAuthButtonComponent],
  imports: [CommonModule],
  exports: [GoogleAuthButtonComponent],
})
export class AuthButtonModule {}
