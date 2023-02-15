import { NotificationType } from "@demo/+notification/core";

export interface SendNotificationToUserDto {
    userId: string;

    type: NotificationType;

    title: string;

    desc?: string | null;

    url?: string | null;
}

export interface SendNotificationToAccountDto {
    accountId: string;

    type: NotificationType;

    title: string;

    desc?: string | null;

    url?: string | null;
}