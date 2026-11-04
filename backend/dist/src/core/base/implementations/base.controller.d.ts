import { Logger } from '@nestjs/common';
import { CrudService } from '../interfaces/crud.interface';
import { BaseEntity } from '../interfaces/entity.interface';
export declare abstract class BaseController<T extends BaseEntity, CreateDto, UpdateDto> {
    protected readonly service: CrudService<T, CreateDto, UpdateDto>;
    protected readonly entityName: string;
    protected readonly logger: Logger;
    constructor(service: CrudService<T, CreateDto, UpdateDto>, entityName: string);
    create(createDto: CreateDto): Promise<T>;
    findAll(): Promise<T[]>;
    findOne(id: string): Promise<T>;
    update(id: string, updateDto: UpdateDto): Promise<T>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
