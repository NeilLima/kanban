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
var LabelService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelService = void 0;
const common_1 = require("@nestjs/common");
const label_repository_1 = require("../repository/label.repository");
let LabelService = LabelService_1 = class LabelService {
    labelRepository;
    logger = new common_1.Logger(LabelService_1.name);
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
            throw new common_1.NotFoundException('Label não encontrada');
        }
        return label;
    }
    async update(id, userId, dto) {
        const label = await this.labelRepository.findById(id);
        if (!label) {
            throw new common_1.NotFoundException('Label não encontrada');
        }
        return this.labelRepository.update(id, { ...dto });
    }
    async remove(id, userId) {
        const label = await this.labelRepository.findById(id);
        if (!label) {
            throw new common_1.NotFoundException('Label não encontrada');
        }
        return this.labelRepository.delete(id);
    }
};
exports.LabelService = LabelService;
exports.LabelService = LabelService = LabelService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [label_repository_1.LabelRepository])
], LabelService);
//# sourceMappingURL=label.service.js.map