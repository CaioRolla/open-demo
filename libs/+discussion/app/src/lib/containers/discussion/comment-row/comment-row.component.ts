import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AuthFacade } from '@demo/+auth/app';
import { Dialog } from '@demo/shared-app/ui/dialog';
import { BehaviorSubject } from 'rxjs';
import { DiscussionFacade } from '../+state/discussion.facade';
import { DiscussionCommentRow } from '../+state/discussion.interface';
import { CommentDeleteDialogComponent } from '../comment-delete-dialog/comment-delete-dialog.component';

@Component({
  selector: 'demo-comment-row',
  templateUrl: './comment-row.component.html',
  styleUrls: ['./comment-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
})
export class CommentRowComponent {
  private readonly _hovered$ = new BehaviorSubject(false);

  public readonly hovered$ = this._hovered$.asObservable();

  public readonly user$ = this._authFacade.user$;

  @Input() comment!: DiscussionCommentRow;

  constructor(
    private readonly _authFacade: AuthFacade,
    private readonly _discussionFacade: DiscussionFacade,
    private readonly _dialog: Dialog
  ) {}

  public onMouseEnter() {
    this._hovered$.next(true);
  }

  public onMouseLeave() {
    this._hovered$.next(false);
  }

  public deleteButtonClicked(): void {
    this._dialog
      .create(CommentDeleteDialogComponent, {
        data: { id: this.comment.id },
      })
      .afterClosed()
      .subscribe((remove) => {
        if (remove) {
          this._discussionFacade.deleteComment(this.comment.id);
        }
      });
  }
}
