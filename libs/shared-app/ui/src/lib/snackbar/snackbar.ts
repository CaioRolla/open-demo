import { Injectable } from '@angular/core';

import { SnackbarConfig } from './interfaces';
import { SnackbarService } from './snackbar.service';

@Injectable()
export class Snackbar {
  constructor(private readonly _snackbarService: SnackbarService) {}

  public open(config: SnackbarConfig): void {
      this._snackbarService.open(config);
  }
}
