import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, switchMap, tap } from 'rxjs';
import { concatLatestFrom } from '@ngrx/effects';
import { ComponentStore } from '@ngrx/component-store';
import { CreateDiscussionCommentDto, GetDiscussionDto } from '@demo/+discussion/core';
import { ErrorResponseDto } from '@demo/shared/utils';
import { DiscussionService } from '../../../services/discussion.service';
import { DiscussionCommentService } from '../../../services/discussion-comment.service';
import { DiscussionCommentRow } from './discussion.interface';

export interface DiscussionState {
  discussion: GetDiscussionDto | null;
  loadingDiscussion: boolean;
  loadDiscussionError: ErrorResponseDto | null;

  comments: DiscussionCommentRow[];

  savingComment: boolean;
  saveCommentError: ErrorResponseDto | null;
}

const initialState: DiscussionState = {
  discussion: null,
  loadingDiscussion: false,
  loadDiscussionError: null,
  comments: [],
  savingComment: false,
  saveCommentError: null,
};

@Injectable()
export class DiscussionFacade extends ComponentStore<DiscussionState> {
  public readonly discussion$ = this.select((state) => state.discussion);
  public readonly loadingDiscussion$ = this.select((state) => state.loadingDiscussion);
  public readonly loadDiscussionError$ = this.select((state) => state.loadDiscussionError);
  public readonly comments$ = this.select((state) => state.comments);
  public readonly savingComment$ = this.select((state) => state.savingComment);

  public readonly displayEmptyMessage$ = this.select(
    (state) => !state.loadingDiscussion && state.comments.length === 0
  );

  constructor(
    private readonly _discussionService: DiscussionService,
    private readonly _discussionCommentService: DiscussionCommentService
  ) {
    super(initialState);
  }

  public readonly loadDiscussion = this.effect((discussionKey$: Observable<string>) => {
    return discussionKey$.pipe(
      tap(() => this.setState((state) => ({ ...state, loadingDiscussion: true, loadDiscussionError: null }))),
      switchMap((discussionKey) => {
        return this._discussionService.get(discussionKey).pipe(
          tap({
            next: (res) =>
              this.setState((state) => ({
                ...state,
                loadingDiscussion: false,
                discussion: res,
                comments: res.comments.map((comment) => ({
                  ...comment,
                  saved: true,
                })),
              })),
            error: (error) =>
              this.setState((state) => ({ ...state, loadingDiscussion: false, loadDiscussionError: error })),
          }),
          catchError((error) => EMPTY)
        );
      })
    );
  });

  public readonly saveComment = this.effect((content$: Observable<string>) => {
    return content$.pipe(
      concatLatestFrom(() => [this.discussion$]),
      tap(() => this.setState((state) => ({ ...state, savingComment: true, saveCommentError: null }))),
      switchMap(([content, discussion]) => {
        return this._discussionCommentService
          .create({
            content,
            discussionId: discussion!.id,
          })
          .pipe(
            tap({
              next: (res) =>
                this.setState((state) => ({ ...state, savingComment: false, comments: [res, ...state.comments] })),
              error: (error) =>
                this.setState((state) => ({ ...state, loadingDiscussion: false, saveCommentError: error })),
            }),
            catchError((error) => EMPTY)
          );
      })
    );
  });

  public readonly deleteComment = this.effect((commentId$: Observable<string>) => {
    return commentId$.pipe(
      tap((commentId) =>
        this.setState((state) => ({ ...state, comments: state.comments.filter((c) => c.id !== commentId) }))
      ),
      switchMap((commentId) => {
        return this._discussionCommentService.delete(commentId).pipe(catchError((error) => EMPTY));
      })
    );
  });
}
