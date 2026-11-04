"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseServiceImpl = void 0;
const common_1 = require("@nestjs/common");
const id_formatter_config_1 = require("../../../config/id-formatter.config");
class BaseServiceImpl {
    repository;
    entityName;
    logger;
    constructor(repository, entityName) {
        this.repository = repository;
        this.entityName = entityName;
        this.logger = new common_1.Logger(`${entityName}Service`);
    }
    async create(createDto) {
        return await this.repository.create(createDto);
    }
    async findById(id, options) {
        if (!id_formatter_config_1.IdFormatter.isValid(id)) {
            this.logger.error(`ID inválido: ${id}`);
            return null;
        }
        return await this.repository.findById(id, options);
    }
    async findOne(filter, options) {
        return await this.repository.findOne(filter, options);
    }
    async findAll(filter, options) {
        return await this.repository.findAll(filter, options);
    }
    async update(id, updateDto) {
        if (!id_formatter_config_1.IdFormatter.isValid(id)) {
            this.logger.error(`ID inválido: ${id}`);
            throw new Error(`ID inválido: ${id}`);
        }
        const exists = await this.repository.findById(id);
        if (!exists) {
            this.logger.error(`${this.entityName} com ID ${id} não encontrado`);
            throw new Error(`${this.entityName} não encontrado`);
        }
        return await this.repository.update(id, updateDto);
    }
    async remove(id) {
        if (!id_formatter_config_1.IdFormatter.isValid(id)) {
            this.logger.error(`ID inválido: ${id}`);
            return false;
        }
        const exists = await this.repository.findById(id);
        if (!exists) {
            this.logger.warn(`${this.entityName} com ID ${id} não encontrado`);
            return false;
        }
        return await this.repository.delete(id);
    }
    async count(filter) {
        return await this.repository.count(filter);
    }
}
exports.BaseServiceImpl = BaseServiceImpl;
//# sourceMappingURL=base.service.js.map