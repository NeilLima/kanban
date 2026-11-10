/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service.js';

@Injectable()
export class ReportRepository {
  constructor(private readonly prisma: PrismaService) {}

  /** Tarefas de todos os projetos do usuário (owner ou membro) */
  async getUserTasks(userId: string) {
    return this.prisma.task.findMany({
      where: {
        project: {
          OR: [{ ownerId: userId }, { members: { some: { userId } } }],
        },
      },
      select: {
        id: true,
        title: true,
        status: true,
        priority: true,
        spentTime: true,
        dueDate: true,
        createdAt: true,
        updatedAt: true,
        project: { select: { id: true, name: true, color: true } },
        assignees: { select: { userId: true } },
      },
    });
  }

  /** Membros (com perfil) dos projetos do usuário */
  async getUserMembers(userId: string) {
    return this.prisma.projectMember.findMany({
      where: {
        project: {
          OR: [{ ownerId: userId }, { members: { some: { userId } } }],
        },
      },
      select: {
        userId: true,
        role: true,
        user: {
          select: {
            email: true,
            profile: { select: { firstName: true, lastName: true } } },
        },
      },
    });
  }

  /** Histórico recente (auditoria) das tarefas dos projetos do usuário */
  async getRecentActivity(userId: string) {
    return this.prisma.taskHistory.findMany({
      where: {
        task: {
          project: {
            OR: [{ ownerId: userId }, { members: { some: { userId } } }],
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 8,
      include: {
        task: { select: { title: true } },
        user: { select: { email: true, profile: { select: { firstName: true, lastName: true } } } },
      },
    });
  }
}
