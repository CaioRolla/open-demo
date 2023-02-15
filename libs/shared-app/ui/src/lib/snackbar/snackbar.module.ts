import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnackbarComponent } from './snackbar/snackbar.component';
import { SnackbarService } from './snackbar.service';
import { Snackbar } from './snackbar';
import { HeroIconsModule } from 'ng-heroicons';

@NgModule({
  declarations: [
    SnackbarComponent
  ],
  imports: [
    CommonModule,
    HeroIconsModule,
  ],
  providers:[
    SnackbarService,
    Snackbar
  ]
})
export class SnackbarModule { }
