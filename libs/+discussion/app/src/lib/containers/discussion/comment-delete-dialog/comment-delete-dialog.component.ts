import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Dialog, NUI_DIALOG_DATA } from '@demo/shared-app/ui/dialog';
import { DiscussionFacade } from '../+state/discussion.facade';

@Component({
  selector: 'demo-comment-delete-dialog',
  templateUrl: './comment-delete-dialog.component.html',
  styleUrls: ['./comment-delete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentDeleteDialogComponent implements OnDestroy, OnInit {
  private readonly _subscriptions = new Subscription();

  constructor(
    @Inject(NUI_DIALOG_DATA) public readonly data: { id: string },
    private readonly _dialog: Dialog
  ) {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  public onCancel(): void {
    this._dialog.close(false);
  }

  public onSubmit(): void {
    this._dialog.close(true);
  }
}
