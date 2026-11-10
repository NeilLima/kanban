import { PrismaService } from '../../../core/prisma/prisma.service.js';
export declare class UserRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: {
        email: string;
        username?: string;
        password: string;
        avatar?: string;
        role?: string;
        createdBy: string;
    }): Promise<{
        profile: {
            id: string;
            firstName: string;
            lastName: string;
            countryIso2: string | null;
            stateIso2: string | null;
            city: string | null;
            birthDate: Date | null;
            gender: string | null;
            userId: string;
        } | null;
        projectMembers: ({
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
            };
        } & {
            id: string;
            role: import("@prisma/client").$Enums.MemberRole;
            createdAt: Date;
            userId: string;
            projectId: string;
        })[];
        assignedTasks: ({
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
            };
        } & {
            userId: string;
            taskId: string;
        })[];
        notifications: {
            id: string;
            createdAt: Date;
            userId: string;
            title: string;
            projectId: string | null;
            taskId: string | null;
            type: import("@prisma/client").$Enums.NotificationType;
            message: string | null;
            isRead: boolean;
        }[];
    } & {
        id: string;
        email: string;
        username: string | null;
        password: string;
        avatar: string | null;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(currentUserId: string): Promise<({
        profile: {
            id: string;
            firstName: string;
            lastName: string;
            countryIso2: string | null;
            stateIso2: string | null;
            city: string | null;
            birthDate: Date | null;
            gender: string | null;
            userId: string;
        } | null;
    } & {
        id: string;
        email: string;
        username: string | null;
        password: string;
        avatar: string | null;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findById(id: string): Promise<({
        profile: {
            id: string;
            firstName: string;
            lastName: string;
            countryIso2: string | null;
            stateIso2: string | null;
            city: string | null;
            birthDate: Date | null;
            gender: string | null;
            userId: string;
        } | null;
        projectMembers: ({
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
            };
        } & {
            id: string;
            role: import("@prisma/client").$Enums.MemberRole;
            createdAt: Date;
            userId: string;
            projectId: string;
        })[];
        assignedTasks: ({
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
            };
        } & {
            userId: string;
            taskId: string;
        })[];
        notifications: {
            id: string;
            createdAt: Date;
            userId: string;
            title: string;
            projectId: string | null;
            taskId: string | null;
            type: import("@prisma/client").$Enums.NotificationType;
            message: string | null;
            isRead: boolean;
        }[];
    } & {
        id: string;
        email: string;
        username: string | null;
        password: string;
        avatar: string | null;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    update(id: string, data: Record<string, unknown>): Promise<{
        profile: {
            id: string;
            firstName: string;
            lastName: string;
            countryIso2: string | null;
            stateIso2: string | null;
            city: string | null;
            birthDate: Date | null;
            gender: string | null;
            userId: string;
        } | null;
        projectMembers: ({
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
            };
        } & {
            id: string;
            role: import("@prisma/client").$Enums.MemberRole;
            createdAt: Date;
            userId: string;
            projectId: string;
        })[];
        assignedTasks: ({
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
            };
        } & {
            userId: string;
            taskId: string;
        })[];
        notifications: {
            id: string;
            createdAt: Date;
            userId: string;
            title: string;
            projectId: string | null;
            taskId: string | null;
            type: import("@prisma/client").$Enums.NotificationType;
            message: string | null;
            isRead: boolean;
        }[];
    } & {
        id: string;
        email: string;
        username: string | null;
        password: string;
        avatar: string | null;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(id: string): Promise<{
        id: string;
        email: string;
        username: string | null;
        password: string;
        avatar: string | null;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getProfile(id: string): Promise<({
        user: {
            id: string;
            email: string;
            username: string | null;
            password: string;
            avatar: string | null;
            role: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        firstName: string;
        lastName: string;
        countryIso2: string | null;
        stateIso2: string | null;
        city: string | null;
        birthDate: Date | null;
        gender: string | null;
        userId: string;
    }) | null>;
    updateAvatar(id: string, avatarUrl: string): Promise<{
        profile: {
            id: string;
            firstName: string;
            lastName: string;
            countryIso2: string | null;
            stateIso2: string | null;
            city: string | null;
            birthDate: Date | null;
            gender: string | null;
            userId: string;
        } | null;
        projectMembers: ({
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
            };
        } & {
            id: string;
            role: import("@prisma/client").$Enums.MemberRole;
            createdAt: Date;
            userId: string;
            projectId: string;
        })[];
        assignedTasks: ({
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
            };
        } & {
            userId: string;
            taskId: string;
        })[];
        notifications: {
            id: string;
            createdAt: Date;
            userId: string;
            title: string;
            projectId: string | null;
            taskId: string | null;
            type: import("@prisma/client").$Enums.NotificationType;
            message: string | null;
            isRead: boolean;
        }[];
    } & {
        id: string;
        email: string;
        username: string | null;
        password: string;
        avatar: string | null;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByEmail(email: string): Promise<({
        profile: {
            id: string;
            firstName: string;
            lastName: string;
            countryIso2: string | null;
            stateIso2: string | null;
            city: string | null;
            birthDate: Date | null;
            gender: string | null;
            userId: string;
        } | null;
    } & {
        id: string;
        email: string;
        username: string | null;
        password: string;
        avatar: string | null;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
}
