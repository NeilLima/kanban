import { TeamRepository } from '../repository/team.repository.js';
export declare class TeamService {
    private readonly repository;
    private readonly logger;
    constructor(repository: TeamRepository);
    getMembers(userId: string): Promise<{
        id: string;
        name: string;
        email: string;
        avatar: string | null;
        role: string;
        roleKey: string;
        projectsCount: number;
        tasks: number;
        done: number;
        productivity: number;
        color: string;
    }[]>;
    getMemberDetail(userId: string, memberId: string): Promise<{
        id: string;
        name: string;
        email: string;
        avatar: string | null;
        role: string;
        color: string;
        projects: {
            id: string;
            name: string;
            color: string;
            isOwner: boolean;
            role: import("@prisma/client").$Enums.MemberRole;
        }[];
        stats: {
            total: number;
            done: number;
            productivity: number;
            overdue: number;
            spentHours: number;
            byStatus: Record<string, number>;
        };
        recentTasks: {
            id: string;
            title: string;
            status: string;
            priority: string;
            dueDate: Date | null;
            project: {
                id: string;
                name: string;
                color: string;
            };
        }[];
    }>;
}
