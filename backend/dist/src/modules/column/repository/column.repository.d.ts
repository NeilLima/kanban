import { PrismaService } from '../../../core/prisma/prisma.service';
export declare class ColumnRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
        };
    } & {
        id: string;
        name: string;
        color: string;
        order: number;
        projectId: string;
    })[]>;
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
        };
    } & {
        id: string;
        name: string;
        color: string;
        order: number;
        projectId: string;
    }) | null>;
    create(projectId: string, data: {
        name: string;
        color?: string;
    }): Promise<{
        id: string;
        name: string;
        color: string;
        order: number;
        projectId: string;
    }>;
    update(id: string, data: Record<string, unknown>): Promise<{
        id: string;
        name: string;
        color: string;
        order: number;
        projectId: string;
    }>;
    delete(id: string): Promise<{
        id: string;
        name: string;
        color: string;
        order: number;
        projectId: string;
    }>;
}
