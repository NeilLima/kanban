import { ProjectService } from '../services/project.service.js';
import { CreateProjectDto, UpdateProjectDto, CreateColumnDto, UpdateColumnDto } from '../dto/project.dto.js';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    findAll(userId: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        color: string;
        icon: string | null;
        status: import("@prisma/client").$Enums.ProjectStatus;
        isFavorite: boolean;
        isArchived: boolean;
        order: number;
        ownerId: string;
        createdAt: Date;
        updatedAt: Date;
        columns: {
            id: string;
            name: string;
            color: string;
            order: number;
            projectId: string;
        }[];
        tasksTotal: number;
        tasksDone: number;
        progress: number;
        members: {
            id: string;
            userId: string;
            role: import("@prisma/client").$Enums.MemberRole;
            name: string;
        }[];
    }[]>;
    findOne(id: string, userId: string): Promise<({
        members: ({
            user: {
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
            };
        } & {
            id: string;
            role: import("@prisma/client").$Enums.MemberRole;
            createdAt: Date;
            userId: string;
            projectId: string;
        })[];
        columns: {
            id: string;
            name: string;
            color: string;
            order: number;
            projectId: string;
        }[];
    } & {
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
    }) | null>;
    create(userId: string, dto: CreateProjectDto): Promise<{
        members: ({
            user: {
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
            };
        } & {
            id: string;
            role: import("@prisma/client").$Enums.MemberRole;
            createdAt: Date;
            userId: string;
            projectId: string;
        })[];
        columns: {
            id: string;
            name: string;
            color: string;
            order: number;
            projectId: string;
        }[];
    } & {
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
    }>;
    update(id: string, userId: string, dto: UpdateProjectDto): Promise<{
        members: ({
            user: {
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
            };
        } & {
            id: string;
            role: import("@prisma/client").$Enums.MemberRole;
            createdAt: Date;
            userId: string;
            projectId: string;
        })[];
        columns: {
            id: string;
            name: string;
            color: string;
            order: number;
            projectId: string;
        }[];
    } & {
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
    }>;
    remove(id: string, userId: string): Promise<{
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
    }>;
    addMember(id: string, userId: string, body: {
        email: string;
    }): Promise<{
        id: string;
        userId: string;
        role: import("@prisma/client").$Enums.MemberRole;
        name: string;
        email: string;
    }>;
    removeMember(id: string, userId: string, memberUserId: string): Promise<{
        removed: boolean;
    }>;
    getBoard(id: string, userId: string): Promise<{
        columns: {
            id: string;
            name: string;
            color: string;
            order: number;
            projectId: string;
        }[];
        tasks: ({
            labels: ({
                label: {
                    id: string;
                    name: string;
                    color: string;
                    projectId: string | null;
                };
            } & {
                labelId: string;
                taskId: string;
            })[];
            _count: {
                comments: number;
                attachments: number;
                checklistItems: number;
            };
            assignees: ({
                user: {
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
                };
            } & {
                userId: string;
                taskId: string;
            })[];
        } & {
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
        })[];
    }>;
    createColumn(id: string, userId: string, dto: CreateColumnDto): Promise<{
        id: string;
        name: string;
        color: string;
        order: number;
        projectId: string;
    }>;
    updateColumn(columnId: string, userId: string, dto: UpdateColumnDto): Promise<{
        id: string;
        name: string;
        color: string;
        order: number;
        projectId: string;
    }>;
    removeColumn(columnId: string, userId: string): Promise<{
        id: string;
        name: string;
        color: string;
        order: number;
        projectId: string;
    }>;
}
