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
var NotificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const notification_repository_1 = require("../repository/notification.repository");
let NotificationService = NotificationService_1 = class NotificationService {
    notificationRepository;
    logger = new common_1.Logger(NotificationService_1.name);
    constructor(notificationRepository) {
        this.notificationRepository = notificationRepository;
    }
    create(userId, dto) {
        this.logger.log(`Criando notificação para o usuário ${dto.userId}`);
        return this.notificationRepository.create({ ...dto, createdBy: userId });
    }
    findAll(userId) {
        return this.notificationRepository.findAll(userId);
    }
    getUnreadCount(userId) {
        return this.notificationRepository.countUnread(userId);
    }
    async findOne(id, userId) {
        const notification = await this.notificationRepository.findById(id);
        if (!notification) {
            throw new common_1.NotFoundException('Notificação não encontrada');
        }
        if (notification.userId !== userId) {
            throw new common_1.ForbiddenException('Você não tem acesso a esta notificação');
        }
        return notification;
    }
    async markAsRead(id, userId) {
        const notification = await this.notificationRepository.findById(id);
        if (!notification) {
            throw new common_1.NotFoundException('Notificação não encontrada');
        }
        if (notification.userId !== userId) {
            throw new common_1.ForbiddenException('Você não tem acesso a esta notificação');
        }
        return this.notificationRepository.markAsRead(id);
    }
    async markAllAsRead(userId) {
        return this.notificationRepository.markAllAsRead(userId);
    }
    async remove(id, userId) {
        const notification = await this.notificationRepository.findById(id);
        if (!notification) {
            throw new common_1.NotFoundException('Notificação não encontrada');
        }
        if (notification.userId !== userId) {
            throw new common_1.ForbiddenException('Você não tem acesso a esta notificação');
        }
        return this.notificationRepository.delete(id);
    }
    async removeAll(userId) {
        return this.notificationRepository.deleteAll(userId);
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = NotificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notification_repository_1.NotificationRepository])
], NotificationService);
//# sourceMappingURL=notification.service.js.map