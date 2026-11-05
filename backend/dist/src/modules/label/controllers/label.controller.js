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
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, } from '@nestjs/common';
import { LabelService } from '../services/label.service';
import { CreateLabelDto, UpdateLabelDto } from '../dto/label.dto';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { GetUser } from '../../../common/decorators/get-user.decorator';
let LabelController = class LabelController {
    labelService;
    constructor(labelService) {
        this.labelService = labelService;
    }
    findAll(userId) {
        return this.labelService.findAll(userId);
    }
    findOne(id, userId) {
        return this.labelService.findOne(id, userId);
    }
    create(userId, dto) {
        return this.labelService.create(userId, dto);
    }
    update(id, userId, dto) {
        return this.labelService.update(id, userId, dto);
    }
    remove(id, userId) {
        return this.labelService.remove(id, userId);
    }
};
__decorate([
    Get(),
    __param(0, GetUser('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LabelController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    __param(0, Param('id')),
    __param(1, GetUser('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], LabelController.prototype, "findOne", null);
__decorate([
    Post(),
    __param(0, GetUser('userId')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, CreateLabelDto]),
    __metadata("design:returntype", void 0)
], LabelController.prototype, "create", null);
__decorate([
    Patch(':id'),
    __param(0, Param('id')),
    __param(1, GetUser('userId')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, UpdateLabelDto]),
    __metadata("design:returntype", void 0)
], LabelController.prototype, "update", null);
__decorate([
    Delete(':id'),
    __param(0, Param('id')),
    __param(1, GetUser('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], LabelController.prototype, "remove", null);
LabelController = __decorate([
    Controller('labels'),
    UseGuards(AuthGuard),
    __metadata("design:paramtypes", [LabelService])
], LabelController);
export { LabelController };
//# sourceMappingURL=label.controller.js.map