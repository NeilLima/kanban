import { Logger } from '@nestjs/common';
import { BaseEntity } from '../interfaces/entity.interface';
import { BaseRepository } from '../interfaces/repository.interface';
import { CrudService } from '../interfaces/crud.interface';
import { FilterOptions, QueryOptions } from '../interfaces/query-options.interface';
export declare class BaseServiceImpl<T extends BaseEntity, CreateDto, UpdateDto> implements CrudService<T, CreateDto, UpdateDto> {
    protected readonly repository: BaseRepository<T>;
    protected readonly entityName: string;
    protected readonly logger: Logger;
    constructor(repository: BaseRepository<T>, entityName: string);
    create(createDto: CreateDto): Promise<T>;
    findById(id: string, options?: QueryOptions): Promise<T | null>;
    findOne(filter: FilterOptions, options?: QueryOptions): Promise<T | null>;
    findAll(filter?: FilterOptions, options?: QueryOptions): Promise<T[]>;
    update(id: string, updateDto: UpdateDto): Promise<T | null>;
    remove(id: string): Promise<boolean>;
    count(filter?: FilterOptions): Promise<number>;
}
