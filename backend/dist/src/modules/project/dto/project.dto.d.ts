export declare class CreateProjectDto {
    name: string;
    description?: string;
    color?: string;
    icon?: string;
}
export declare class UpdateProjectDto {
    name?: string;
    description?: string;
    color?: string;
    icon?: string;
    isFavorite?: boolean;
    isArchived?: boolean;
}
export declare class CreateColumnDto {
    name: string;
    color?: string;
}
export declare class UpdateColumnDto {
    name?: string;
    color?: string;
    order?: number;
}
