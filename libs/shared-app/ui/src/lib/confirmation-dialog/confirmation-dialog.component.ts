import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

export enum ConfirmationDialogButtonTheme {
  PRIMARY = 'PRIMARY',
  DANGER = 'DANGER',
}

@Component({
  selector: 'demo-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {
  @Input() loading: boolean = false;
  @Input() titleText!: string;
  @Input() confirmText!: string;
  @Input() confirmButtonText!: string;
  @Input() confirmationButtonTheme: ConfirmationDialogButtonTheme = ConfirmationDialogButtonTheme.DANGER;

  @Output() confirmed = new EventEmitter<boolean>();

  public readonly ConfirmationDialogButtonTheme = ConfirmationDialogButtonTheme;

  public onCancel(): void {
    this.confirmed.emit(false);
  }

  public async onSubmit() {
    this.confirmed.emit(true);
  }
}
