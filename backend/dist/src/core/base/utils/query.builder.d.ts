import { FilterOptions } from '../interfaces/query-options.interface.js';
export declare class QueryBuilder {
    static buildFilter(params: Record<string, any>): FilterOptions;
    static buildUpdate(data: Record<string, any>): Record<string, any>;
}
