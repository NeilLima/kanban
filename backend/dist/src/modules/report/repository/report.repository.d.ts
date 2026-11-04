import { PrismaService } from '../../../core/prisma/prisma.service';
export declare class ReportRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getUserTasks(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        project: {
            id: string;
            name: string;
            color: string;
        };
        status: import("@prisma/client").$Enums.TaskStatus;
        title: string;
        priority: import("@prisma/client").$Enums.TaskPriority;
        dueDate: Date | null;
        spentTime: number | null;
        assignees: {
            userId: string;
        }[];
    }[]>;
    getUserMembers(userId: string): Promise<{
        role: import("@prisma/client").$Enums.MemberRole;
        user: {
            email: string;
            profile: {
                firstName: string;
                lastName: string;
            } | null;
        };
        userId: string;
    }[]>;
    getRecentActivity(userId: string): Promise<({
        user: {
            email: string;
            profile: {
                firstName: string;
                lastName: string;
            } | null;
        } | null;
        task: {
            title: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string | null;
        taskId: string;
        field: string;
        oldValue: string | null;
        newValue: string | null;
    })[]>;
}
