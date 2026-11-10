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
import { ProjectService } from '../services/project.service.js';
import { CreateProjectDto, UpdateProjectDto, CreateColumnDto, UpdateColumnDto, } from '../dto/project.dto.js';
import { AuthGuard } from '../../../common/guards/auth.guard.js';
import { GetUser } from '../../../common/decorators/get-user.decorator.js';
let ProjectController = class ProjectController {
    projectService;
    constructor(projectService) {
        this.projectService = projectService;
    }
    findAll(userId) {
        return this.projectService.findAllForUser(userId);
    }
    findOne(id, userId) {
        return this.projectService.findOne(id, userId);
    }
    create(userId, dto) {
        return this.projectService.create(userId, dto);
    }
    update(id, userId, dto) {
        return this.projectService.update(id, userId, dto);
    }
    remove(id, userId) {
        return this.projectService.remove(id, userId);
    }
    addMember(id, userId, body) {
        return this.projectService.addMember(id, userId, body.email);
    }
    removeMember(id, userId, memberUserId) {
        return this.projectService.removeMember(id, userId, memberUserId);
    }
    getBoard(id, userId) {
        return this.projectService.getBoard(id, userId);
    }
    createColumn(id, userId, dto) {
        return this.projectService.createColumn(id, userId, dto);
    }
    updateColumn(columnId, userId, dto) {
        return this.projectService.updateColumn(columnId, userId, dto);
    }
    removeColumn(columnId, userId) {
        return this.projectService.removeColumn(columnId, userId);
    }
};
__decorate([
    Get(),
    __param(0, GetUser('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    __param(0, Param('id')),
    __param(1, GetUser('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "findOne", null);
__decorate([
    Post(),
    __param(0, GetUser('userId')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, CreateProjectDto]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "create", null);
__decorate([
    Patch(':id'),
    __param(0, Param('id')),
    __param(1, GetUser('userId')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, UpdateProjectDto]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "update", null);
__decorate([
    Delete(':id'),
    __param(0, Param('id')),
    __param(1, GetUser('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "remove", null);
__decorate([
    Post(':id/members'),
    __param(0, Param('id')),
    __param(1, GetUser('userId')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "addMember", null);
__decorate([
    Delete(':id/members/:memberUserId'),
    __param(0, Param('id')),
    __param(1, GetUser('userId')),
    __param(2, Param('memberUserId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "removeMember", null);
__decorate([
    Get(':id/board'),
    __param(0, Param('id')),
    __param(1, GetUser('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "getBoard", null);
__decorate([
    Post(':id/columns'),
    __param(0, Param('id')),
    __param(1, GetUser('userId')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, CreateColumnDto]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "createColumn", null);
__decorate([
    Patch('columns/:columnId'),
    __param(0, Param('columnId')),
    __param(1, GetUser('userId')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, UpdateColumnDto]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "updateColumn", null);
__decorate([
    Delete('columns/:columnId'),
    __param(0, Param('columnId')),
    __param(1, GetUser('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "removeColumn", null);
ProjectController = __decorate([
    Controller('projects'),
    UseGuards(AuthGuard),
    __metadata("design:paramtypes", [ProjectService])
], ProjectController);
export { ProjectController };
//# sourceMappingURL=project.controller.js.map