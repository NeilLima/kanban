import { ColumnRepository } from '../repository/column.repository.js';
import { CreateColumnDto, UpdateColumnDto } from '../dto/column.dto.js';
export declare class ColumnService {
    private readonly columnRepository;
    private readonly logger;
    constructor(columnRepository: ColumnRepository);
    create(userId: string, dto: CreateColumnDto): Promise<{
        id: string;
        name: string;
        color: string;
        order: number;
        projectId: string;
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
