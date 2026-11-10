import { LabelService } from '../services/label.service.js';
import { CreateLabelDto, UpdateLabelDto } from '../dto/label.dto.js';
export declare class LabelController {
    private readonly labelService;
    constructor(labelService: LabelService);
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
        } | null;
    } & {
        id: string;
        name: string;
        color: string;
        projectId: string | null;
    }>;
    create(userId: string, dto: CreateLabelDto): Promise<{
        id: string;
        name: string;
        color: string;
        projectId: string | null;
    }>;
    update(id: string, userId: string, dto: UpdateLabelDto): Promise<{
        id: string;
        name: string;
        color: string;
        projectId: string | null;
    }>;
    remove(id: string, userId: string): Promise<{
        id: string;
        name: string;
        color: string;
        projectId: string | null;
    }>;
}
