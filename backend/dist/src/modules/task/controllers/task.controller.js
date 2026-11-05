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
import { TaskService } from '../services/task.service';
import { CreateTaskDto, UpdateTaskDto, MoveTaskDto } from '../dto/task.dto';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { GetUser } from '../../../common/decorators/get-user.decorator';
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
__decorate([
    Get(':id'),
    __param(0, Param('id')),
    __param(1, GetUser('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "findOne", null);
__decorate([
    Post(),
    __param(0, GetUser('userId')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, CreateTaskDto]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "create", null);
__decorate([
    Patch(':id'),
    __param(0, Param('id')),
    __param(1, GetUser('userId')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, UpdateTaskDto]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "update", null);
__decorate([
    Patch(':id/move'),
    __param(0, Param('id')),
    __param(1, GetUser('userId')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, MoveTaskDto]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "move", null);
__decorate([
    Delete(':id'),
    __param(0, Param('id')),
    __param(1, GetUser('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "remove", null);
__decorate([
    Get(':id/history'),
    __param(0, Param('id')),
    __param(1, GetUser('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "getHistory", null);
__decorate([
    Post(':id/checklist'),
    __param(0, Param('id')),
    __param(1, GetUser('userId')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "addChecklistItem", null);
__decorate([
    Patch('checklist/:itemId'),
    __param(0, Param('itemId')),
    __param(1, GetUser('userId')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "updateChecklistItem", null);
__decorate([
    Delete('checklist/:itemId'),
    __param(0, Param('itemId')),
    __param(1, GetUser('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "removeChecklistItem", null);
__decorate([
    Post(':id/comments'),
    __param(0, Param('id')),
    __param(1, GetUser('userId')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "addComment", null);
__decorate([
    Patch('comments/:commentId'),
    __param(0, Param('commentId')),
    __param(1, GetUser('userId')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "updateComment", null);
__decorate([
    Delete('comments/:commentId'),
    __param(0, Param('commentId')),
    __param(1, GetUser('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "removeComment", null);
TaskController = __decorate([
    Controller('tasks'),
    UseGuards(AuthGuard),
    __metadata("design:paramtypes", [TaskService])
], TaskController);
export { TaskController };
//# sourceMappingURL=task.controller.js.map