"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepositoryImpl = void 0;
const id_formatter_config_1 = require("../../../config/id-formatter.config");
const common_1 = require("@nestjs/common");
class BaseRepositoryImpl {
    model;
    entityName;
    logger;
    constructor(model, entityName) {
        this.model = model;
        this.entityName = entityName;
        this.logger = new common_1.Logger(`${entityName}Repository`);
    }
    async create(data) {
        try {
            const processedData = { ...data };
            if (processedData['postId'] && typeof processedData['postId'] === 'string') {
                processedData['postId'] = id_formatter_config_1.IdFormatter.toId(processedData['postId']);
            }
            if (processedData['userId'] && typeof processedData['userId'] === 'string') {
                processedData['userId'] = id_formatter_config_1.IdFormatter.toId(processedData['userId']);
            }
            if (this.entityName === 'EventParticipant') {
                const entity = new this.model({
                    ...processedData,
                    registeredAt: new Date()
                });
                return await entity.save();
            }
            const entity = new this.model(processedData);
            return await entity.save();
        }
        catch (error) {
            this.logger.error(`Erro ao criar ${this.entityName}: ${error.message}`);
            throw error;
        }
    }
    processPopulate(query, populate) {
        if (Array.isArray(populate)) {
            populate.forEach(path => {
                query = query.populate(path);
            });
        }
        else if (typeof populate === 'string') {
            query = query.populate(populate);
        }
        else if (populate && typeof populate === 'object') {
            query = query.populate(populate);
        }
        return query;
    }
    async findById(id, options) {
        try {
            if (!id_formatter_config_1.IdFormatter.isValid(id)) {
                this.logger.error(`ID inválido: ${id}`);
                return null;
            }
            let query = this.model.findById(id_formatter_config_1.IdFormatter.toId(id));
            if (options?.select) {
                query = query.select(options.select);
            }
            if (options?.populate) {
                query = this.processPopulate(query, options.populate);
            }
            const result = await query.exec();
            return result;
        }
        catch (error) {
            this.logger.error(`Erro ao buscar ${this.entityName} por ID: ${error.message}`);
            throw error;
        }
    }
    async findOne(filter, options) {
        try {
            let query = this.model.findOne(filter);
            if (options?.select) {
                query = query.select(options.select);
            }
            if (options?.populate) {
                query = this.processPopulate(query, options.populate);
            }
            const result = await query.exec();
            return result;
        }
        catch (error) {
            this.logger.error(`Erro ao buscar ${this.entityName}: ${error.message}`);
            throw error;
        }
    }
    async findAll(filter = {}, options) {
        try {
            let query = this.model.find(filter);
            if (options?.skip) {
                query = query.skip(options.skip);
            }
            if (options?.limit) {
                query = query.limit(options.limit);
            }
            if (options?.sort) {
                query = query.sort(options.sort);
            }
            if (options?.select) {
                query = query.select(options.select);
            }
            if (options?.populate) {
                query = this.processPopulate(query, options.populate);
            }
            const documentsPromise = options?.lean
                ? query.lean().exec()
                : query.exec();
            const result = await documentsPromise;
            return result;
        }
        catch (error) {
            this.logger.error(`Erro ao buscar todos ${this.entityName}s: ${error.message}`);
            throw error;
        }
    }
    async update(id, data) {
        try {
            if (!id_formatter_config_1.IdFormatter.isValid(id)) {
                this.logger.error(`ID inválido: ${id}`);
                throw new Error(`ID inválido: ${id}`);
            }
            const objectId = id_formatter_config_1.IdFormatter.toId(id);
            const result = await this.model.findByIdAndUpdate(objectId, { $set: data }, { new: true }).exec();
            return result;
        }
        catch (error) {
            this.logger.error(`Erro ao atualizar ${this.entityName}: ${error.message}`);
            throw error;
        }
    }
    async delete(id) {
        try {
            if (!id_formatter_config_1.IdFormatter.isValid(id)) {
                this.logger.error(`ID inválido: ${id}`);
                return false;
            }
            const objectId = id_formatter_config_1.IdFormatter.toId(id);
            const result = await this.model.findByIdAndDelete(objectId).exec();
            return result != null;
        }
        catch (error) {
            this.logger.error(`Erro ao remover ${this.entityName}: ${error.message}`);
            throw error;
        }
    }
    async count(filter = {}) {
        try {
            return await this.model.countDocuments(filter).exec();
        }
        catch (error) {
            this.logger.error(`Erro ao contar ${this.entityName}s: ${error.message}`);
            throw error;
        }
    }
    async exists(filter) {
        try {
            const count = await this.model.countDocuments(filter).limit(1).exec();
            return count > 0;
        }
        catch (error) {
            this.logger.error(`Erro ao verificar existência de ${this.entityName}: ${error.message}`);
            throw error;
        }
    }
}
exports.BaseRepositoryImpl = BaseRepositoryImpl;
//# sourceMappingURL=base.repository.js.map