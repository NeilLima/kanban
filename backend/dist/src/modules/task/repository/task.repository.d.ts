import { PrismaService } from '../../../core/prisma/prisma.service';
export declare class TaskRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findTaskById(id: string): Promise<{
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
    } | null>;
    findColumnById(id: string): Promise<{
        id: string;
        name: string;
        color: string;
        order: number;
        projectId: string;
    } | null>;
    findDetailById(id: string): Promise<{
        comments: ({
            author: {
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
            replies: ({
                author: {
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
                createdAt: Date;
                updatedAt: Date;
                taskId: string;
                parentId: string | null;
                content: string;
                authorId: string;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            taskId: string;
            parentId: string | null;
            content: string;
            authorId: string;
        })[];
        labels: ({
            label: {
                id: string;
                name: string;
                color: string;
                projectId: string | null;
            };
        } & {
            taskId: string;
            labelId: string;
        })[];
        _count: {
            comments: number;
            attachments: number;
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
        checklistItems: {
            id: string;
            createdAt: Date;
            order: number;
            title: string;
            taskId: string;
            isDone: boolean;
        }[];
        history: ({
            user: ({
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
            }) | null;
        } & {
            id: string;
            createdAt: Date;
            userId: string | null;
            taskId: string;
            field: string;
            oldValue: string | null;
            newValue: string | null;
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
    }>;
    create(data: {
        title: string;
        description?: string;
        columnId: string;
        projectId: string;
        category?: string;
        color?: string;
        dueDate?: Date;
        estimatedTime?: number;
        creatorId?: string;
        assigneeIds?: string[];
        labelIds?: string[];
    }): Promise<{
        labels: ({
            label: {
                id: string;
                name: string;
                color: string;
                projectId: string | null;
            };
        } & {
            taskId: string;
            labelId: string;
        })[];
        _count: {
            comments: number;
            attachments: number;
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
        checklistItems: {
            id: string;
            createdAt: Date;
            order: number;
            title: string;
            taskId: string;
            isDone: boolean;
        }[];
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
    }>;
    update(id: string, data: Record<string, unknown>): Promise<{
        labels: ({
            label: {
                id: string;
                name: string;
                color: string;
                projectId: string | null;
            };
        } & {
            taskId: string;
            labelId: string;
        })[];
        _count: {
            comments: number;
            attachments: number;
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
        checklistItems: {
            id: string;
            createdAt: Date;
            order: number;
            title: string;
            taskId: string;
            isDone: boolean;
        }[];
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
    }>;
    delete(id: string): Promise<{
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
    }>;
    findHistory(taskId: string): Promise<({
        user: ({
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
        }) | null;
    } & {
        id: string;
        createdAt: Date;
        userId: string | null;
        taskId: string;
        field: string;
        oldValue: string | null;
        newValue: string | null;
    })[]>;
    logHistory(data: {
        taskId: string;
        userId?: string;
        field: string;
        oldValue?: string;
        newValue?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        userId: string | null;
        taskId: string;
        field: string;
        oldValue: string | null;
        newValue: string | null;
    }>;
    replaceAssignees(taskId: string, userIds: string[]): Promise<void>;
    replaceLabels(taskId: string, labelIds: string[]): Promise<void>;
    createChecklistItem(taskId: string, title: string, order: number): Promise<{
        id: string;
        createdAt: Date;
        order: number;
        title: string;
        taskId: string;
        isDone: boolean;
    }>;
    updateChecklistItem(id: string, data: Record<string, unknown>): Promise<{
        id: string;
        createdAt: Date;
        order: number;
        title: string;
        taskId: string;
        isDone: boolean;
    }>;
    deleteChecklistItem(id: string): Promise<{
        id: string;
        createdAt: Date;
        order: number;
        title: string;
        taskId: string;
        isDone: boolean;
    }>;
    createComment(data: {
        content: string;
        taskId: string;
        authorId: string;
        parentId?: string;
    }): Promise<{
        author: {
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
        createdAt: Date;
        updatedAt: Date;
        taskId: string;
        parentId: string | null;
        content: string;
        authorId: string;
    }>;
    updateComment(id: string, content: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        taskId: string;
        parentId: string | null;
        content: string;
        authorId: string;
    }>;
    deleteComment(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        taskId: string;
        parentId: string | null;
        content: string;
        authorId: string;
    }>;
}
