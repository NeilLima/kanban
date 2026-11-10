import { FilterOptions, QueryOptions } from './query-options.interface.js';
export interface CrudService<T, CreateDto, UpdateDto> {
    create(createDto: CreateDto): Promise<T>;
    findById(id: string, options?: QueryOptions): Promise<T | null>;
    findOne(filter: FilterOptions, options?: QueryOptions): Promise<T | null>;
    findAll(filter?: FilterOptions, options?: QueryOptions): Promise<T[]>;
    update(id: string, updateDto: UpdateDto): Promise<T | null>;
    remove(id: string): Promise<boolean>;
    count(filter?: FilterOptions): Promise<number>;
}
export interface CrudController<T, CreateDto, UpdateDto> {
    create(createDto: CreateDto): Promise<T>;
    findOne(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
    update(id: string, updateDto: UpdateDto): Promise<T | null>;
    remove(id: string): Promise<void>;
}
