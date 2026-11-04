/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';

const NOTIFICATION_INCLUDE = {
  task: true,
  project: true,
};

@Injectable()
export class NotificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    userId: string;
    type: string;
    title: string;
    message?: string;
    taskId?: string;
    projectId?: string;
    createdBy: string;
  }) {
    return this.prisma.notification.create({
      data: {
        userId: data.userId,
        type: data.type as any,
        title: data.title,
        message: data.message,
        taskId: data.taskId,
        projectId: data.projectId,
      },
      include: NOTIFICATION_INCLUDE,
    });
  }

  async findAll(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      include: NOTIFICATION_INCLUDE,
      orderBy: { createdAt: 'desc' },
    });
  }

  async countUnread(userId: string) {
    return this.prisma.notification.count({
      where: { userId, isRead: false },
    });
  }

  async findById(id: string) {
    return this.prisma.notification.findUnique({
      where: { id },
      include: NOTIFICATION_INCLUDE,
    });
  }

  async markAsRead(id: string) {
    return this.prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async markAllAsRead(userId: string) {
    return this.prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });
  }

  async delete(id: string) {
    return this.prisma.notification.delete({ where: { id } });
  }

  async deleteAll(userId: string) {
    return this.prisma.notification.deleteMany({ where: { userId } });
  }
}