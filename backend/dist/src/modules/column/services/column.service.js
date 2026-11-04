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
var ColumnService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnService = void 0;
const common_1 = require("@nestjs/common");
const column_repository_1 = require("../repository/column.repository");
let ColumnService = ColumnService_1 = class ColumnService {
    columnRepository;
    logger = new common_1.Logger(ColumnService_1.name);
    constructor(columnRepository) {
        this.columnRepository = columnRepository;
    }
    create(userId, dto) {
        this.logger.log(`Criando coluna "${dto.name}"`);
        return this.columnRepository.create(dto.projectId, dto);
    }
    findAll(userId) {
        return this.columnRepository.findAll(userId);
    }
    async findOne(id, userId) {
        const column = await this.columnRepository.findById(id);
        if (!column) {
            throw new common_1.NotFoundException('Coluna não encontrada');
        }
        return column;
    }
    async update(id, userId, dto) {
        const column = await this.columnRepository.findById(id);
        if (!column) {
            throw new common_1.NotFoundException('Coluna não encontrada');
        }
        return this.columnRepository.update(id, { ...dto });
    }
    async remove(id, userId) {
        const column = await this.columnRepository.findById(id);
        if (!column) {
            throw new common_1.NotFoundException('Coluna não encontrada');
        }
        return this.columnRepository.delete(id);
    }
};
exports.ColumnService = ColumnService;
exports.ColumnService = ColumnService = ColumnService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [column_repository_1.ColumnRepository])
], ColumnService);
//# sourceMappingURL=column.service.js.map