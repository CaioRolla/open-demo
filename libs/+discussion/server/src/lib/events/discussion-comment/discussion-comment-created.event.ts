export class DiscussionCommentCreatedEvent {
  public static event = 'discussion-comment.created';
  constructor(public commentId: string, public userId: string) {}
}
