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
exports.ProjectController = void 0;
const common_1 = require("@nestjs/common");
const project_service_1 = require("../services/project.service");
const project_dto_1 = require("../dto/project.dto");
const auth_guard_1 = require("../../../common/guards/auth.guard");
const get_user_decorator_1 = require("../../../common/decorators/get-user.decorator");
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
exports.ProjectController = ProjectController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, project_dto_1.CreateProjectDto]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, project_dto_1.UpdateProjectDto]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/members'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "addMember", null);
__decorate([
    (0, common_1.Delete)(':id/members/:memberUserId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)('userId')),
    __param(2, (0, common_1.Param)('memberUserId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "removeMember", null);
__decorate([
    (0, common_1.Get)(':id/board'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "getBoard", null);
__decorate([
    (0, common_1.Post)(':id/columns'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, project_dto_1.CreateColumnDto]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "createColumn", null);
__decorate([
    (0, common_1.Patch)('columns/:columnId'),
    __param(0, (0, common_1.Param)('columnId')),
    __param(1, (0, get_user_decorator_1.GetUser)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, project_dto_1.UpdateColumnDto]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "updateColumn", null);
__decorate([
    (0, common_1.Delete)('columns/:columnId'),
    __param(0, (0, common_1.Param)('columnId')),
    __param(1, (0, get_user_decorator_1.GetUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "removeColumn", null);
exports.ProjectController = ProjectController = __decorate([
    (0, common_1.Controller)('projects'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectController);
//# sourceMappingURL=project.controller.js.map