import { Type } from '@nestjs/common';
import { BaseEntity } from '../interfaces/entity.interface.js';
export interface CrudOptions<T extends BaseEntity, CreateDto, UpdateDto> {
    model: Type<T>;
    dto: {
        create: Type<CreateDto>;
        update: Type<UpdateDto>;
    };
    routes?: {
        exclude?: Array<'create' | 'findAll' | 'findOne' | 'update' | 'remove'>;
        only?: Array<'create' | 'findAll' | 'findOne' | 'update' | 'remove'>;
    };
    entity?: {
        name?: string;
    };
}
export declare function Crud<T extends BaseEntity, CreateDto, UpdateDto>(options: CrudOptions<T, CreateDto, UpdateDto>): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
