import { ReportRepository } from '../repository/report.repository';
export declare class ReportService {
    private readonly repository;
    constructor(repository: ReportRepository);
    getOverview(userId: string): Promise<{
        kpis: {
            done: {
                value: number;
                percentage: string;
                trend: "up" | "down";
            };
            hours: {
                value: number;
                percentage: string;
                trend: "up" | "down";
            };
            productivity: {
                value: number;
                percentage: string;
                trend: "up" | "down";
            };
            overdue: {
                value: number;
                percentage: string;
                trend: "up" | "down";
            };
        };
        productivity: {
            label: string;
            concluidas: number;
            pendentes: number;
            horas: number;
            atrasadas: number;
        }[];
        distribution: {
            name: string;
            value: number;
            color: string;
        }[];
        timeSpent: {
            project: string;
            tarefas: number;
            horas: number;
            color: string;
        }[];
        team: {
            id: string;
            name: string;
            email: string;
            role: string;
            tarefas: number;
            done: number;
            produtividade: number;
            color: string;
        }[];
        upcoming: {
            id: string;
            title: string;
            dueDate: Date | null;
            priority: string;
            category: string;
            color: string;
            status: string;
        }[];
        calendar: {
            title: string;
            dueDate: Date | null;
            status: import("@prisma/client").$Enums.TaskStatus;
            color: string;
        }[];
        activity: {
            id: string;
            action: string;
            taskTitle: string;
            userName: string;
            createdAt: Date;
        }[];
    }>;
}
