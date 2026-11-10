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
import { ColumnService } from '../services/column.service.js';
import { CreateColumnDto, UpdateColumnDto } from '../dto/column.dto.js';
import { AuthGuard } from '../../../common/guards/auth.guard.js';
import { GetUser } from '../../../common/decorators/get-user.decorator.js';
let ColumnController = class ColumnController {
    columnService;
    constructor(columnService) {
        this.columnService = columnService;
    }
    findAll(userId) {
        return this.columnService.findAll(userId);
    }
    findOne(id, userId) {
        return this.columnService.findOne(id, userId);
    }
    create(userId, dto) {
        return this.columnService.create(userId, dto);
    }
    update(id, userId, dto) {
        return this.columnService.update(id, userId, dto);
    }
    remove(id, userId) {
        return this.columnService.remove(id, userId);
    }
};
__decorate([
    Get(),
    __param(0, GetUser('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ColumnController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    __param(0, Param('id')),
    __param(1, GetUser('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ColumnController.prototype, "findOne", null);
__decorate([
    Post(),
    __param(0, GetUser('userId')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, CreateColumnDto]),
    __metadata("design:returntype", void 0)
], ColumnController.prototype, "create", null);
__decorate([
    Patch(':id'),
    __param(0, Param('id')),
    __param(1, GetUser('userId')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, UpdateColumnDto]),
    __metadata("design:returntype", void 0)
], ColumnController.prototype, "update", null);
__decorate([
    Delete(':id'),
    __param(0, Param('id')),
    __param(1, GetUser('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ColumnController.prototype, "remove", null);
ColumnController = __decorate([
    Controller('columns'),
    UseGuards(AuthGuard),
    __metadata("design:paramtypes", [ColumnService])
], ColumnController);
export { ColumnController };
//# sourceMappingURL=column.controller.js.map