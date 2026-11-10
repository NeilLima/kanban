import { ColumnService } from '../services/column.service.js';
import { CreateColumnDto, UpdateColumnDto } from '../dto/column.dto.js';
export declare class ColumnController {
    private readonly columnService;
    constructor(columnService: ColumnService);
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
    findOne(id: string, userId: string): Promise<{
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
    }>;
    create(userId: string, dto: CreateColumnDto): Promise<{
        id: string;
        name: string;
        color: string;
        order: number;
        projectId: string;
    }>;
    update(id: string, userId: string, dto: UpdateColumnDto): Promise<{
        id: string;
        name: string;
        color: string;
        order: number;
        projectId: string;
    }>;
    remove(id: string, userId: string): Promise<{
        id: string;
        name: string;
        color: string;
        order: number;
        projectId: string;
    }>;
}
