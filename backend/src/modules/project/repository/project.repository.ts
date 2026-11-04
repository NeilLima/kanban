/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';

const PROJECT_INCLUDE = {
  members: { include: { user: { include: { profile: true } } } },
  columns: { orderBy: { order: 'asc' as const } },
};

@Injectable()
export class ProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    name: string;
    description?: string;
    color?: string;
    icon?: string;
    ownerId: string;
  }) {
    return this.prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        color: data.color ?? '#3b82f6',
        icon: data.icon,
        ownerId: data.ownerId,
        members: {
          create: { userId: data.ownerId, role: 'OWNER' },
        },
        columns: {
          create: [
            { name: 'A Fazer', color: '#3b82f6', order: 0 },
            { name: 'Em Desenvolvimento', color: '#f59e0b', order: 1 },
            { name: 'Em Revisão', color: '#8b5cf6', order: 2 },
            { name: 'Concluído', color: '#10b981', order: 3 },
          ],
        },
      },
      include: PROJECT_INCLUDE,
    });
  }

  async findAllForUser(userId: string) {
    return this.prisma.project.findMany({
      where: {
        OR: [
          { ownerId: userId },
          { members: { some: { userId } } },
        ],
        isArchived: false,
      },
      include: {
        ...PROJECT_INCLUDE,
        // Contadores vêm do banco: total e concluídas (regra 11)
        tasks: { select: { status: true } },
      },
      orderBy: { order: 'asc' },
    });
  }

  async findById(id: string) {
    return this.prisma.project.findUnique({
      where: { id },
      include: PROJECT_INCLUDE,
    });
  }

  async update(id: string, data: Record<string, unknown>) {
    return this.prisma.project.update({
      where: { id },
      data,
      include: PROJECT_INCLUDE,
    });
  }

  async delete(id: string) {
    return this.prisma.project.delete({ where: { id } });
  }

  /** Verifica se o usuário tem acesso ao projeto (owner ou member) */
  async assertAccess(projectId: string, userId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: { members: true },
    });
    if (!project) {
      throw new NotFoundException('Projeto não encontrado');
    }
    const isMember =
      project.ownerId === userId ||
      project.members.some((m) => m.userId === userId);
    if (!isMember) {
      throw new ForbiddenException('Sem acesso a este projeto');
    }
    return project;
  }

  /** Apenas OWNER/ADMIN podem editar/excluir projetos e gerenciar membros */
  async assertAdmin(projectId: string, userId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: { members: true },
    });
    if (!project) {
      throw new NotFoundException('Projeto não encontrado');
    }
    const role = project.members.find((m) => m.userId === userId)?.role;
    const isAdmin = project.ownerId === userId || role === 'OWNER' || role === 'ADMIN';
    if (!isAdmin) {
      throw new ForbiddenException('Apenas administradores podem executar esta ação');
    }
    return project;
  }

  // ---- Membros ----

  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    });
  }

  async findMember(projectId: string, userId: string) {
    return this.prisma.projectMember.findUnique({
      where: { projectId_userId: { projectId, userId } },
    });
  }

  async addMember(projectId: string, userId: string, role = 'MEMBER') {
    return this.prisma.projectMember.create({
      data: { projectId, userId, role: role as any },
      include: { user: { include: { profile: true } } },
    });
  }

  async removeMember(projectId: string, userId: string) {
    return this.prisma.projectMember.delete({
      where: { projectId_userId: { projectId, userId } },
    });
  }

  // ---- Colunas ----

  async createColumn(projectId: string, name: string, color?: string) {
    const last = await this.prisma.column.findFirst({
      where: { projectId },
      orderBy: { order: 'desc' },
    });
    return this.prisma.column.create({
      data: {
        name,
        color: color ?? '#6366f1',
        projectId,
        order: (last?.order ?? -1) + 1,
      },
    });
  }

  async findColumnById(id: string) {
    return this.prisma.column.findUnique({ where: { id } });
  }

  async updateColumn(id: string, data: Record<string, unknown>) {
    return this.prisma.column.update({ where: { id }, data });
  }

  async deleteColumn(id: string) {
    return this.prisma.column.delete({ where: { id } });
  }

  /** Board completo: colunas + tarefas com relacionamentos */
  async findBoard(projectId: string) {
    const columns = await this.prisma.column.findMany({
      where: { projectId },
      orderBy: { order: 'asc' },
    });
    const tasks = await this.prisma.task.findMany({
      where: { projectId },
      include: {
        assignees: { include: { user: { include: { profile: true } } } },
        labels: { include: { label: true } },
        _count: { select: { comments: true, attachments: true, checklistItems: true } },
      },
      orderBy: { order: 'asc' },
    });
    return { columns, tasks };
  }
}



