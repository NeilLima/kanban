"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const common_1 = require("@nestjs/common");
const id_formatter_config_1 = require("../../../config/id-formatter.config");
class BaseController {
    service;
    entityName;
    logger;
    constructor(service, entityName) {
        this.service = service;
        this.entityName = entityName;
        this.logger = new common_1.Logger(`${entityName}Controller`);
    }
    async create(createDto) {
        try {
            return await this.service.create(createDto);
        }
        catch (error) {
            this.logger.error(`Erro ao criar: ${error.message}`);
            throw new common_1.HttpException(error.message || 'Erro ao criar registro', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAll() {
        try {
            return await this.service.findAll();
        }
        catch (error) {
            this.logger.error(`Erro ao buscar registros: ${error.message}`);
            throw new common_1.HttpException(error.message || 'Erro ao buscar registros', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            if (!id_formatter_config_1.IdFormatter.isValid(id)) {
                this.logger.error(`ID inválido: ${id}`);
                throw new common_1.HttpException('ID inválido', common_1.HttpStatus.BAD_REQUEST);
            }
            const found = await this.service.findById(id);
            if (!found) {
                this.logger.warn(`Registro com ID ${id} não encontrado`);
                throw new common_1.HttpException('Registro não encontrado', common_1.HttpStatus.NOT_FOUND);
            }
            return found;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            this.logger.error(`Erro ao buscar registro: ${error.message}`);
            throw new common_1.HttpException(error.message || 'Erro ao buscar registro', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, updateDto) {
        try {
            if (!id_formatter_config_1.IdFormatter.isValid(id)) {
                this.logger.error(`ID inválido: ${id}`);
                throw new common_1.HttpException('ID inválido', common_1.HttpStatus.BAD_REQUEST);
            }
            const updated = await this.service.update(id, updateDto);
            if (!updated) {
                this.logger.warn(`Registro com ID ${id} não encontrado`);
                throw new common_1.HttpException('Registro não encontrado', common_1.HttpStatus.NOT_FOUND);
            }
            return updated;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            this.logger.error(`Erro ao atualizar registro: ${error.message}`);
            throw new common_1.HttpException(error.message || 'Erro ao atualizar registro', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            if (!id_formatter_config_1.IdFormatter.isValid(id)) {
                this.logger.error(`ID inválido: ${id}`);
                throw new common_1.HttpException('ID inválido', common_1.HttpStatus.BAD_REQUEST);
            }
            const result = await this.service.remove(id);
            if (!result) {
                this.logger.warn(`Registro com ID ${id} não encontrado`);
                throw new common_1.HttpException('Registro não encontrado', common_1.HttpStatus.NOT_FOUND);
            }
            return { success: true, message: 'Registro removido com sucesso' };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            this.logger.error(`Erro ao remover registro: ${error.message}`);
            throw new common_1.HttpException(error.message || 'Erro ao remover registro', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
exports.BaseController = BaseController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "remove", null);
//# sourceMappingURL=base.controller.js.map