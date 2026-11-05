var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var LabelService_1;
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { LabelRepository } from '../repository/label.repository';
let LabelService = LabelService_1 = class LabelService {
    labelRepository;
    logger = new Logger(LabelService_1.name);
    constructor(labelRepository) {
        this.labelRepository = labelRepository;
    }
    create(userId, dto) {
        this.logger.log(`Criando label "${dto.name}"`);
        return this.labelRepository.create(dto);
    }
    findAll(userId) {
        return this.labelRepository.findAll(userId);
    }
    async findOne(id, userId) {
        const label = await this.labelRepository.findById(id);
        if (!label) {
            throw new NotFoundException('Label não encontrada');
        }
        return label;
    }
    async update(id, userId, dto) {
        const label = await this.labelRepository.findById(id);
        if (!label) {
            throw new NotFoundException('Label não encontrada');
        }
        return this.labelRepository.update(id, { ...dto });
    }
    async remove(id, userId) {
        const label = await this.labelRepository.findById(id);
        if (!label) {
            throw new NotFoundException('Label não encontrada');
        }
        return this.labelRepository.delete(id);
    }
};
LabelService = LabelService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [LabelRepository])
], LabelService);
export { LabelService };
//# sourceMappingURL=label.service.js.map