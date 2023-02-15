import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { AuthFacade } from '@demo/+auth/app';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DiscussionFacade } from './+state/discussion.facade';
import { DiscussionCommentRow } from './+state/discussion.interface';

@Component({
  selector: 'demo-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DiscussionFacade],
})
export class DiscussionComponent implements OnInit, OnDestroy {
  private readonly _subscription = new Subscription();

  public readonly form = this._initForm();

  public readonly discussion$ = this._discussionFacade.discussion$;

  public readonly comments$ = this._discussionFacade.comments$;

  public readonly user$ = this._authFacade.user$;

  public readonly savingComment$ = this._discussionFacade.savingComment$

  public readonly commenting$ = new BehaviorSubject(false);

  @Input() set discussionKey(discussionKey: string) {
    this._discussionFacade.loadDiscussion(discussionKey);
  }

  public readonly quill = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
    ],
  };

  constructor(
    private readonly _discussionFacade: DiscussionFacade,
    private readonly _fb: UntypedFormBuilder,
    private readonly _authFacade: AuthFacade
  ) {}

  public ngOnInit(): void {
    this._handleSave();
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private _initForm() {
    return this._fb.group({
      content: ['', [Validators.required]],
    });
  }

  private _handleSave(): void {
    const sub = this.savingComment$.subscribe((saving) => {
      if (!saving) {
        this.commenting$.next(false);
        this.form.reset();
      }
    });
    this._subscription.add(sub);
  }

  public onCancel(): void {
    this.commenting$.next(false);
  }

  public commentSectionClicked(): void {
    this.commenting$.next(true);

    setTimeout(() => {
      const el = document.getElementById('comment-content')?.getElementsByClassName('ql-editor')[0] as any;

      el.focus();
    }, 100);
  }

  public onSubmit(): void {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    if (this.form.valid) {
      this._discussionFacade.saveComment(this.form.value.content);
    }
  }

  public trackCommentById(index: number, comment: DiscussionCommentRow) {
    return comment.id;
  }
}
