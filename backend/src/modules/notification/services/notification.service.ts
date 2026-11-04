/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger, NotFoundException, ForbiddenException } from '@nestjs/common';

import { NotificationRepository } from '../repository/notification.repository';
import { CreateNotificationDto, UpdateNotificationDto } from '../dto/notification.dto';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(private readonly notificationRepository: NotificationRepository) {}

  create(userId: string, dto: CreateNotificationDto) {
    this.logger.log(`Criando notificação para o usuário ${dto.userId}`);
    return this.notificationRepository.create({ ...dto, createdBy: userId });
  }

  findAll(userId: string) {
    return this.notificationRepository.findAll(userId);
  }

  getUnreadCount(userId: string) {
    return this.notificationRepository.countUnread(userId);
  }

  async findOne(id: string, userId: string) {
    const notification = await this.notificationRepository.findById(id);
    if (!notification) {
      throw new NotFoundException('Notificação não encontrada');
    }
    if (notification.userId !== userId) {
      throw new ForbiddenException('Você não tem acesso a esta notificação');
    }
    return notification;
  }

  async markAsRead(id: string, userId: string) {
    const notification = await this.notificationRepository.findById(id);
    if (!notification) {
      throw new NotFoundException('Notificação não encontrada');
    }
    if (notification.userId !== userId) {
      throw new ForbiddenException('Você não tem acesso a esta notificação');
    }
    return this.notificationRepository.markAsRead(id);
  }

  async markAllAsRead(userId: string) {
    return this.notificationRepository.markAllAsRead(userId);
  }

  async remove(id: string, userId: string) {
    const notification = await this.notificationRepository.findById(id);
    if (!notification) {
      throw new NotFoundException('Notificação não encontrada');
    }
    if (notification.userId !== userId) {
      throw new ForbiddenException('Você não tem acesso a esta notificação');
    }
    return this.notificationRepository.delete(id);
  }

  async removeAll(userId: string) {
    return this.notificationRepository.deleteAll(userId);
  }
}