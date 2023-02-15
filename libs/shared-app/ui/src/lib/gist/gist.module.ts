import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GistComponent } from './gist.component';



@NgModule({
  declarations: [
    GistComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GistComponent
  ]
})
export class GistModule { }
