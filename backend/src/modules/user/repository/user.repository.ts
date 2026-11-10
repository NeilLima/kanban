/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service.js';

const USER_INCLUDE = {
  profile: true,
  projectMembers: { include: { project: true } },
  assignedTasks: { include: { task: true } },
  notifications: { where: { isRead: false }, orderBy: { createdAt: 'desc' as const } },
};

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    email: string;
    username?: string;
    password: string;
    avatar?: string;
    role?: string;
    createdBy: string;
  }) {
    return this.prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        password: data.password,
        avatar: data.avatar,
        role: data.role ?? 'member',
      },
      include: USER_INCLUDE,
    });
  }

  async findAll(currentUserId: string) {
    return this.prisma.user.findMany({
      where: { id: { not: currentUserId } },
      include: { profile: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: USER_INCLUDE,
    });
  }

  async update(id: string, data: Record<string, unknown>) {
    return this.prisma.user.update({
      where: { id },
      data,
      include: USER_INCLUDE,
    });
  }

  async delete(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  async getProfile(id: string) {
    return this.prisma.profile.findUnique({
      where: { userId: id },
      include: { user: true },
    });
  }

  async updateAvatar(id: string, avatarUrl: string) {
    return this.prisma.user.update({
      where: { id },
      data: { avatar: avatarUrl },
      include: USER_INCLUDE,
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    });
  }
}