import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar.component';
import { AltLettersPipe } from './alt-letters.pipe';

@NgModule({
  declarations: [AvatarComponent, AltLettersPipe],
  imports: [CommonModule],
  exports: [AvatarComponent],
})
export class AvatarModule {}
