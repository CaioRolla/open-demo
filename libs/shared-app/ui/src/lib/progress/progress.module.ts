import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerProgressComponent } from './spinner-progress/spinner-progress.component';
import { LinearProgressComponent } from './linear-progress/linear-progress.component';



@NgModule({
  declarations: [
    SpinnerProgressComponent,
    LinearProgressComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SpinnerProgressComponent,
    LinearProgressComponent
  ]
})
export class ProgressModule { }
