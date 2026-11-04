import { PrismaService } from '../../../core/prisma/prisma.service';
export declare class NotificationRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: {
        userId: string;
        type: string;
        title: string;
        message?: string;
        taskId?: string;
        projectId?: string;
        createdBy: string;
    }): Promise<{
        project: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            status: import("@prisma/client").$Enums.ProjectStatus;
            color: string;
            icon: string | null;
            isFavorite: boolean;
            isArchived: boolean;
            order: number;
            ownerId: string;
        } | null;
        task: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            status: import("@prisma/client").$Enums.TaskStatus;
            color: string;
            order: number;
            title: string;
            priority: import("@prisma/client").$Enums.TaskPriority;
            category: string | null;
            columnId: string;
            projectId: string;
            creatorId: string | null;
            startDate: Date | null;
            dueDate: Date | null;
            estimatedTime: number | null;
            spentTime: number | null;
            progress: number;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        message: string | null;
        title: string;
        projectId: string | null;
        taskId: string | null;
        type: import("@prisma/client").$Enums.NotificationType;
        isRead: boolean;
    }>;
    findAll(userId: string): Promise<({
        project: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            status: import("@prisma/client").$Enums.ProjectStatus;
            color: string;
            icon: string | null;
            isFavorite: boolean;
            isArchived: boolean;
            order: number;
            ownerId: string;
        } | null;
        task: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            status: import("@prisma/client").$Enums.TaskStatus;
            color: string;
            order: number;
            title: string;
            priority: import("@prisma/client").$Enums.TaskPriority;
            category: string | null;
            columnId: string;
            projectId: string;
            creatorId: string | null;
            startDate: Date | null;
            dueDate: Date | null;
            estimatedTime: number | null;
            spentTime: number | null;
            progress: number;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        message: string | null;
        title: string;
        projectId: string | null;
        taskId: string | null;
        type: import("@prisma/client").$Enums.NotificationType;
        isRead: boolean;
    })[]>;
    countUnread(userId: string): Promise<number>;
    findById(id: string): Promise<({
        project: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            status: import("@prisma/client").$Enums.ProjectStatus;
            color: string;
            icon: string | null;
            isFavorite: boolean;
            isArchived: boolean;
            order: number;
            ownerId: string;
        } | null;
        task: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            status: import("@prisma/client").$Enums.TaskStatus;
            color: string;
            order: number;
            title: string;
            priority: import("@prisma/client").$Enums.TaskPriority;
            category: string | null;
            columnId: string;
            projectId: string;
            creatorId: string | null;
            startDate: Date | null;
            dueDate: Date | null;
            estimatedTime: number | null;
            spentTime: number | null;
            progress: number;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        message: string | null;
        title: string;
        projectId: string | null;
        taskId: string | null;
        type: import("@prisma/client").$Enums.NotificationType;
        isRead: boolean;
    }) | null>;
    markAsRead(id: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        message: string | null;
        title: string;
        projectId: string | null;
        taskId: string | null;
        type: import("@prisma/client").$Enums.NotificationType;
        isRead: boolean;
    }>;
    markAllAsRead(userId: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
    delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        message: string | null;
        title: string;
        projectId: string | null;
        taskId: string | null;
        type: import("@prisma/client").$Enums.NotificationType;
        isRead: boolean;
    }>;
    deleteAll(userId: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
