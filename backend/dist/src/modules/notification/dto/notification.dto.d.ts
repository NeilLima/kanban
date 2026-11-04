import { NotificationType } from '@prisma/client';
export declare class CreateNotificationDto {
    userId: string;
    type: NotificationType;
    title: string;
    message?: string;
    taskId?: string;
    projectId?: string;
}
export declare class UpdateNotificationDto {
    title?: string;
    message?: string;
}
