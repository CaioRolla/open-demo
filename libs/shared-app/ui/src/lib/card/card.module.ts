import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { CardSimpleHeaderComponent } from './card-simple-header/card-simple-header.component';
import { CardActionsFooterComponent } from './card-actions-footer/card-actions-footer.component';

@NgModule({
  declarations: [
    CardComponent,
    CardSimpleHeaderComponent,
    CardActionsFooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardComponent,
    CardSimpleHeaderComponent,
    CardActionsFooterComponent
  ]
})
export class CardModule { }
