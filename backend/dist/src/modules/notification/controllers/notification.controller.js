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
import { NotificationService } from '../services/notification.service.js';
import { CreateNotificationDto } from '../dto/notification.dto.js';
import { AuthGuard } from '../../../common/guards/auth.guard.js';
import { GetUser } from '../../../common/decorators/get-user.decorator.js';
let NotificationController = class NotificationController {
    notificationService;
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    findAll(userId) {
        return this.notificationService.findAll(userId);
    }
    getUnreadCount(userId) {
        return this.notificationService.getUnreadCount(userId);
    }
    findOne(id, userId) {
        return this.notificationService.findOne(id, userId);
    }
    create(userId, dto) {
        return this.notificationService.create(userId, dto);
    }
    markAsRead(id, userId) {
        return this.notificationService.markAsRead(id, userId);
    }
    markAllAsRead(userId) {
        return this.notificationService.markAllAsRead(userId);
    }
    remove(id, userId) {
        return this.notificationService.remove(id, userId);
    }
    removeAll(userId) {
        return this.notificationService.removeAll(userId);
    }
};
__decorate([
    Get(),
    __param(0, GetUser('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "findAll", null);
__decorate([
    Get('unread-count'),
    __param(0, GetUser('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "getUnreadCount", null);
__decorate([
    Get(':id'),
    __param(0, Param('id')),
    __param(1, GetUser('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "findOne", null);
__decorate([
    Post(),
    __param(0, GetUser('userId')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, CreateNotificationDto]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "create", null);
__decorate([
    Patch(':id/read'),
    __param(0, Param('id')),
    __param(1, GetUser('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "markAsRead", null);
__decorate([
    Patch('read-all'),
    __param(0, GetUser('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "markAllAsRead", null);
__decorate([
    Delete(':id'),
    __param(0, Param('id')),
    __param(1, GetUser('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "remove", null);
__decorate([
    Delete(),
    __param(0, GetUser('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "removeAll", null);
NotificationController = __decorate([
    Controller('notifications'),
    UseGuards(AuthGuard),
    __metadata("design:paramtypes", [NotificationService])
], NotificationController);
export { NotificationController };
//# sourceMappingURL=notification.controller.js.map