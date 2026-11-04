export interface QueryOptions {
    skip?: number;
    limit?: number;
    sort?: Record<string, 1 | -1>;
    select?: string | string[];
    populate?: string | string[] | Record<string, any>;
    lean?: boolean;
    collation?: {
        locale: string;
        strength?: number;
    };
}
export interface FilterOptions {
    [key: string]: any;
}
