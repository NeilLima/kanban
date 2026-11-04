import { UserService } from '../services/user.service';
import { UpdateUserDto } from '../dto/user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(userId: string): Promise<({
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
    findOne(id: string, userId: string): Promise<{
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
            message: string | null;
            title: string;
            projectId: string | null;
            taskId: string | null;
            type: import("@prisma/client").$Enums.NotificationType;
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
    update(id: string, userId: string, dto: UpdateUserDto): Promise<{
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
            message: string | null;
            title: string;
            projectId: string | null;
            taskId: string | null;
            type: import("@prisma/client").$Enums.NotificationType;
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
    remove(id: string, userId: string): Promise<{
        id: string;
        email: string;
        username: string | null;
        password: string;
        avatar: string | null;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getProfile(id: string, userId: string): Promise<{
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
    }>;
    updateAvatar(id: string, userId: string, body: {
        avatarUrl: string;
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
            message: string | null;
            title: string;
            projectId: string | null;
            taskId: string | null;
            type: import("@prisma/client").$Enums.NotificationType;
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
}
