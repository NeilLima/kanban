export declare class CreateTaskDto {
    title: string;
    description?: string;
    columnId?: string;
    category?: string;
    color?: string;
    dueDate?: string;
    estimatedTime?: number;
    assigneeIds?: string[];
    labelIds?: string[];
    status?: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';
    priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
    projectId?: string;
}
export declare class UpdateTaskDto {
    title?: string;
    description?: string;
    category?: string;
    color?: string;
    status?: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';
    priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
    dueDate?: string;
    progress?: number;
    order?: number;
    assigneeIds?: string[];
    labelIds?: string[];
}
export declare class MoveTaskDto {
    columnId: string;
    order?: number;
}
