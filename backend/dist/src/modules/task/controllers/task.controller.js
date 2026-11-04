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
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const task_service_1 = require("../services/task.service");
const task_dto_1 = require("../dto/task.dto");
const auth_guard_1 = require("../../../common/guards/auth.guard");
const get_user_decorator_1 = require("../../../common/decorators/get-user.decorator");
let TaskController = class TaskController {
    taskService;
    constructor(taskService) {
        this.taskService = taskService;
    }
    findOne(id, userId) {
        return this.taskService.findOne(id, userId);
    }
    create(userId, dto) {
        return this.taskService.create(userId, dto);
    }
    update(id, userId, dto) {
        return this.taskService.update(id, userId, dto);
    }
    move(id, userId, dto) {
        return this.taskService.move(id, userId, dto);
    }
    remove(id, userId) {
        return this.taskService.remove(id, userId);
    }
    getHistory(id, userId) {
        return this.taskService.getHistory(id, userId);
    }
    addChecklistItem(id, userId, body) {
        return this.taskService.addChecklistItem(id, userId, body.title);
    }
    updateChecklistItem(itemId, userId, body) {
        return this.taskService.updateChecklistItem(itemId, userId, body);
    }
    removeChecklistItem(itemId, userId) {
        return this.taskService.removeChecklistItem(itemId, userId);
    }
    addComment(id, userId, body) {
        return this.taskService.addComment(id, userId, body.content, body.parentId);
    }
    updateComment(commentId, userId, body) {
        return this.taskService.updateComment(commentId, userId, body.content);
    }
    removeComment(commentId, userId) {
        return this.taskService.removeComment(commentId, userId);
    }
};
exports.TaskController = TaskController;
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, task_dto_1.CreateTaskDto]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, task_dto_1.UpdateTaskDto]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/move'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, task_dto_1.MoveTaskDto]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "move", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id/history'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "getHistory", null);
__decorate([
    (0, common_1.Post)(':id/checklist'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "addChecklistItem", null);
__decorate([
    (0, common_1.Patch)('checklist/:itemId'),
    __param(0, (0, common_1.Param)('itemId')),
    __param(1, (0, get_user_decorator_1.GetUser)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "updateChecklistItem", null);
__decorate([
    (0, common_1.Delete)('checklist/:itemId'),
    __param(0, (0, common_1.Param)('itemId')),
    __param(1, (0, get_user_decorator_1.GetUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "removeChecklistItem", null);
__decorate([
    (0, common_1.Post)(':id/comments'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "addComment", null);
__decorate([
    (0, common_1.Patch)('comments/:commentId'),
    __param(0, (0, common_1.Param)('commentId')),
    __param(1, (0, get_user_decorator_1.GetUser)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "updateComment", null);
__decorate([
    (0, common_1.Delete)('comments/:commentId'),
    __param(0, (0, common_1.Param)('commentId')),
    __param(1, (0, get_user_decorator_1.GetUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "removeComment", null);
exports.TaskController = TaskController = __decorate([
    (0, common_1.Controller)('tasks'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
//# sourceMappingURL=task.controller.js.map