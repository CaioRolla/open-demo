export interface GetDiscussionCommentDto {
    id: string;

    userId: string;

    userDisplayName: string;

    userProfileUrl: string | null;

    content: string;

    createdAt: Date;
}

export interface GetDiscussionDto {
    id: string;

    key: string;

    comments: GetDiscussionCommentDto[];

    createdAt: Date;
}