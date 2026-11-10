/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service.js';

const PROJECT_SCOPE = (userId: string) => ({
  OR: [{ ownerId: userId }, { members: { some: { userId } } }],
});

@Injectable()
export class TeamRepository {
  constructor(private readonly prisma: PrismaService) {}

  /** Projetos visíveis para o usuário (owner ou membro) */
  async getVisibleProjects(userId: string) {
    return this.prisma.project.findMany({
      where: PROJECT_SCOPE(userId),
      select: {
        id: true,
        name: true,
        color: true,
        ownerId: true,
        owner: {
          select: {
            id: true,
            email: true,
            avatar: true,
            profile: { select: { firstName: true, lastName: true } },
          },
        },
        members: {
          select: {
            userId: true,
            role: true,
            user: {
              select: {
                id: true,
                email: true,
                avatar: true,
                profile: { select: { firstName: true, lastName: true } },
              },
            },
          },
        },
      },
    });
  }

  /** Tarefas dos projetos visíveis, com responsáveis e projeto */
  async getVisibleTasks(userId: string) {
    return this.prisma.task.findMany({
      where: { project: PROJECT_SCOPE(userId) },
      select: {
        id: true,
        title: true,
        status: true,
        priority: true,
        dueDate: true,
        spentTime: true,
        updatedAt: true,
        creatorId: true,
        projectId: true,
        project: { select: { id: true, name: true, color: true } },
        assignees: { select: { userId: true } },
      },
    });
  }

  /** Detalhe: projetos onde o usuário alvo participa (compartilhados com mim) */
  async getMemberProjects(userId: string, memberId: string) {
    const projects = await this.prisma.project.findMany({
      where: {
        AND: [
          PROJECT_SCOPE(userId),
          {
            OR: [
              { ownerId: memberId },
              { members: { some: { userId: memberId } } },
            ],
          },
        ],
      },
      select: {
        id: true,
        name: true,
        color: true,
        ownerId: true,
        members: {
          where: { userId: memberId },
          select: { role: true },
        },
      },
    });
    return projects.map((p) => ({
      id: p.id,
      name: p.name,
      color: p.color,
      isOwner: p.ownerId === memberId,
      role: p.members[0]?.role ?? (p.ownerId === memberId ? 'OWNER' : 'MEMBER'),
    }));
  }

  /** Dados básicos do usuário */
  async getMemberUser(memberId: string) {
    return this.prisma.user.findUnique({
      where: { id: memberId },
      select: {
        id: true,
        email: true,
        avatar: true,
        profile: { select: { firstName: true, lastName: true } },
      },
    });
  }

  /** Tarefas atribuídas/criadas pelo membro nos projetos compartilhados */
  async getMemberTasks(userId: string, memberId: string) {
    return this.prisma.task.findMany({
      where: {
        project: {
          AND: [
            PROJECT_SCOPE(userId),
            {
              OR: [
                { ownerId: memberId },
                { members: { some: { userId: memberId } } },
              ],
            },
          ],
        },
      },
      select: {
        id: true,
        title: true,
        status: true,
        priority: true,
        dueDate: true,
        spentTime: true,
        updatedAt: true,
        creatorId: true,
        project: { select: { id: true, name: true, color: true } },
        assignees: { select: { userId: true } },
      },
    });
  }
}
