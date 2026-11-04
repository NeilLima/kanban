export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
    meta?: {
        page?: number;
        limit?: number;
        total?: number;
        pages?: number;
    };
}
export declare class ResponseBuilder {
    static success<T>(data: T, message?: string): ApiResponse<T>;
    static error(error: string): ApiResponse<null>;
    static paginated<T>(data: T[], total: number, page: number, limit: number): ApiResponse<T[]>;
}
