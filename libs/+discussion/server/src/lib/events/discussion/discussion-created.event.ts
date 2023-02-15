export class DiscussionCreatedEvent {
  public static event = 'discussion.created';
  constructor(public discussionId: string, public userId: string) {}
}
