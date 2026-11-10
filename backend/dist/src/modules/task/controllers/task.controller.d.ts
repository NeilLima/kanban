import { TaskService } from '../services/task.service.js';
import { CreateTaskDto, UpdateTaskDto, MoveTaskDto } from '../dto/task.dto.js';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    findOne(id: string, userId: string): Promise<{
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
                parentId: string | null;
                taskId: string;
                content: string;
                authorId: string;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            parentId: string | null;
            taskId: string;
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
            labelId: string;
            taskId: string;
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
    create(userId: string, dto: CreateTaskDto): Promise<{
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
    update(id: string, userId: string, dto: UpdateTaskDto): Promise<{
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
    move(id: string, userId: string, dto: MoveTaskDto): Promise<{
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
    remove(id: string, userId: string): Promise<{
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
    getHistory(id: string, userId: string): Promise<({
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
    addChecklistItem(id: string, userId: string, body: {
        title: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        order: number;
        title: string;
        taskId: string;
        isDone: boolean;
    }>;
    updateChecklistItem(itemId: string, userId: string, body: {
        title?: string;
        isDone?: boolean;
    }): Promise<{
        id: string;
        createdAt: Date;
        order: number;
        title: string;
        taskId: string;
        isDone: boolean;
    }>;
    removeChecklistItem(itemId: string, userId: string): Promise<{
        success: boolean;
    }>;
    addComment(id: string, userId: string, body: {
        content: string;
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
        parentId: string | null;
        taskId: string;
        content: string;
        authorId: string;
    }>;
    updateComment(commentId: string, userId: string, body: {
        content: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        parentId: string | null;
        taskId: string;
        content: string;
        authorId: string;
    }>;
    removeComment(commentId: string, userId: string): Promise<{
        success: boolean;
    }>;
}
