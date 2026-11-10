import { PrismaService } from '../../../core/prisma/prisma.service.js';
export declare class ProjectRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: {
        name: string;
        description?: string;
        color?: string;
        icon?: string;
        ownerId: string;
    }): Promise<{
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
    findAllForUser(userId: string): Promise<({
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
        tasks: {
            status: import("@prisma/client").$Enums.TaskStatus;
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
    })[]>;
    findById(id: string): Promise<({
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
    update(id: string, data: Record<string, unknown>): Promise<{
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
    delete(id: string): Promise<{
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
    assertAccess(projectId: string, userId: string): Promise<{
        members: {
            id: string;
            role: import("@prisma/client").$Enums.MemberRole;
            createdAt: Date;
            userId: string;
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
    assertAdmin(projectId: string, userId: string): Promise<{
        members: {
            id: string;
            role: import("@prisma/client").$Enums.MemberRole;
            createdAt: Date;
            userId: string;
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
    findUserByEmail(email: string): Promise<({
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
    }) | null>;
    findMember(projectId: string, userId: string): Promise<{
        id: string;
        role: import("@prisma/client").$Enums.MemberRole;
        createdAt: Date;
        userId: string;
        projectId: string;
    } | null>;
    addMember(projectId: string, userId: string, role?: string): Promise<{
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
    }>;
    removeMember(projectId: string, userId: string): Promise<{
        id: string;
        role: import("@prisma/client").$Enums.MemberRole;
        createdAt: Date;
        userId: string;
        projectId: string;
    }>;
    createColumn(projectId: string, name: string, color?: string): Promise<{
        id: string;
        name: string;
        color: string;
        order: number;
        projectId: string;
    }>;
    findColumnById(id: string): Promise<{
        id: string;
        name: string;
        color: string;
        order: number;
        projectId: string;
    } | null>;
    updateColumn(id: string, data: Record<string, unknown>): Promise<{
        id: string;
        name: string;
        color: string;
        order: number;
        projectId: string;
    }>;
    deleteColumn(id: string): Promise<{
        id: string;
        name: string;
        color: string;
        order: number;
        projectId: string;
    }>;
    findBoard(projectId: string): Promise<{
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
}
