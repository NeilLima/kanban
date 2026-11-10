interface QueryLike<R> {
    select: (value: unknown) => QueryLike<R>;
    populate: (value: unknown) => QueryLike<R>;
    skip: (value: number) => QueryLike<R>;
    limit: (value: number) => QueryLike<R>;
    sort: (value: unknown) => QueryLike<R>;
    lean: <TLean>() => QueryLike<TLean>;
    exec: () => Promise<R>;
    write: (value: unknown) => void;
    end: () => void;
    on: (event: string, handler: (...args: unknown[]) => void) => void;
    id?: unknown;
}
interface ModelLike<T> {
    new (data: unknown): {
        save: () => Promise<T>;
    };
    findById: (id: unknown) => QueryLike<T | null>;
    findOne: (filter: unknown) => QueryLike<T | null>;
    find: (filter: unknown) => QueryLike<T[]>;
    findByIdAndUpdate: (id: unknown, update: unknown, options: unknown) => QueryLike<T | null>;
    findByIdAndDelete: (id: unknown) => QueryLike<T | null>;
    countDocuments: (filter: unknown) => QueryLike<number>;
}
import { BaseEntity } from '../interfaces/entity.interface.js';
import { BaseRepository } from '../interfaces/repository.interface.js';
import { FilterOptions, QueryOptions } from '../interfaces/query-options.interface.js';
import { Logger } from '@nestjs/common';
export declare class BaseRepositoryImpl<T extends BaseEntity> implements BaseRepository<T> {
    protected readonly model: ModelLike<T>;
    protected readonly entityName: string;
    protected readonly logger: Logger;
    constructor(model: ModelLike<T>, entityName: string);
    create(data: Partial<T>): Promise<T>;
    private processPopulate;
    findById(id: string, options?: QueryOptions): Promise<T | null>;
    findOne(filter: FilterOptions, options?: QueryOptions): Promise<T | null>;
    findAll(filter?: FilterOptions, options?: QueryOptions): Promise<T[]>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
    count(filter?: FilterOptions): Promise<number>;
    exists(filter: FilterOptions): Promise<boolean>;
}
export {};
