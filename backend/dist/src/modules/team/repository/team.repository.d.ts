import { PrismaService } from '../../../core/prisma/prisma.service.js';
export declare class TeamRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getVisibleProjects(userId: string): Promise<{
        id: string;
        name: string;
        color: string;
        ownerId: string;
        owner: {
            id: string;
            email: string;
            avatar: string | null;
            profile: {
                firstName: string;
                lastName: string;
            } | null;
        };
        members: {
            user: {
                id: string;
                email: string;
                avatar: string | null;
                profile: {
                    firstName: string;
                    lastName: string;
                } | null;
            };
            role: import("@prisma/client").$Enums.MemberRole;
            userId: string;
        }[];
    }[]>;
    getVisibleTasks(userId: string): Promise<{
        project: {
            id: string;
            name: string;
            color: string;
        };
        id: string;
        status: import("@prisma/client").$Enums.TaskStatus;
        updatedAt: Date;
        projectId: string;
        title: string;
        priority: import("@prisma/client").$Enums.TaskPriority;
        creatorId: string | null;
        dueDate: Date | null;
        spentTime: number | null;
        assignees: {
            userId: string;
        }[];
    }[]>;
    getMemberProjects(userId: string, memberId: string): Promise<{
        id: string;
        name: string;
        color: string;
        isOwner: boolean;
        role: import("@prisma/client").$Enums.MemberRole;
    }[]>;
    getMemberUser(memberId: string): Promise<{
        id: string;
        email: string;
        avatar: string | null;
        profile: {
            firstName: string;
            lastName: string;
        } | null;
    } | null>;
    getMemberTasks(userId: string, memberId: string): Promise<{
        project: {
            id: string;
            name: string;
            color: string;
        };
        id: string;
        status: import("@prisma/client").$Enums.TaskStatus;
        updatedAt: Date;
        title: string;
        priority: import("@prisma/client").$Enums.TaskPriority;
        creatorId: string | null;
        dueDate: Date | null;
        spentTime: number | null;
        assignees: {
            userId: string;
        }[];
    }[]>;
}
