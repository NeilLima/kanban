import { PrismaService } from '../../../core/prisma/prisma.service.js';
export declare class LabelRepository {
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
        } | null;
    } & {
        id: string;
        name: string;
        color: string;
        projectId: string | null;
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
        } | null;
    } & {
        id: string;
        name: string;
        color: string;
        projectId: string | null;
    }) | null>;
    create(data: {
        name: string;
        color?: string;
        projectId: string;
    }): Promise<{
        id: string;
        name: string;
        color: string;
        projectId: string | null;
    }>;
    update(id: string, data: Record<string, unknown>): Promise<{
        id: string;
        name: string;
        color: string;
        projectId: string | null;
    }>;
    delete(id: string): Promise<{
        id: string;
        name: string;
        color: string;
        projectId: string | null;
    }>;
}
