/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service.js';

const TASK_INCLUDE = {
  assignees: { include: { user: { include: { profile: true } } } },
  labels: { include: { label: true } },
  checklistItems: { orderBy: { order: 'asc' as const } },
  _count: { select: { comments: true, attachments: true } },
};

@Injectable()
export class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findTaskById(id: string) {
    return this.prisma.task.findUnique({ where: { id } });
  }

  async findColumnById(id: string) {
    return this.prisma.column.findUnique({ where: { id } });
  }

  async findDetailById(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        ...TASK_INCLUDE,
        comments: {
          where: { parentId: null },
          include: {
            author: { include: { profile: true } },
            replies: { include: { author: { include: { profile: true } } } },
          },
          orderBy: { createdAt: 'desc' },
        },
        history: {
          include: { user: { include: { profile: true } } },
          orderBy: { createdAt: 'desc' },
          take: 50,
        },
      },
    });
    if (!task) throw new NotFoundException('Tarefa não encontrada');
    return task;
  }

  async create(data: {
    title: string;
    description?: string;
    columnId: string;
    projectId: string;
    status?: string;
    priority?: string;
    category?: string;
    color?: string;
    dueDate?: Date;
    estimatedTime?: number;
    creatorId?: string;
    assigneeIds?: string[];
    labelIds?: string[];
  }) {
    const last = await this.prisma.task.findFirst({
      where: { columnId: data.columnId },
      orderBy: { order: 'desc' },
    });

    return this.prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        columnId: data.columnId,
        projectId: data.projectId,
        status: (data.status as any) ?? 'TODO',
        priority: (data.priority as any) ?? 'MEDIUM',
        category: data.category,
        color: data.color ?? '#3b82f6',
        dueDate: data.dueDate,
        estimatedTime: data.estimatedTime,
        creatorId: data.creatorId,
        order: (last?.order ?? -1) + 1,
        assignees: data.assigneeIds?.length
          ? { create: data.assigneeIds.map((userId) => ({ userId })) }
          : undefined,
        labels: data.labelIds?.length
          ? { create: data.labelIds.map((labelId) => ({ labelId })) }
          : undefined,
      },
      include: TASK_INCLUDE,
    });
  }

  async update(id: string, data: Record<string, unknown>) {
    return this.prisma.task.update({
      where: { id },
      data,
      include: TASK_INCLUDE,
    });
  }

  async delete(id: string) {
    return this.prisma.task.delete({ where: { id } });
  }

  async findHistory(taskId: string) {
    return this.prisma.taskHistory.findMany({
      where: { taskId },
      include: { user: { include: { profile: true } } },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  async logHistory(data: {
    taskId: string;
    userId?: string;
    field: string;
    oldValue?: string;
    newValue?: string;
  }) {
    return this.prisma.taskHistory.create({ data });
  }

  async replaceAssignees(taskId: string, userIds: string[]) {
    await this.prisma.taskAssignee.deleteMany({ where: { taskId } });
    if (userIds.length) {
      await this.prisma.taskAssignee.createMany({
        data: userIds.map((userId) => ({ taskId, userId })),
      });
    }
  }

  async replaceLabels(taskId: string, labelIds: string[]) {
    await this.prisma.taskLabel.deleteMany({ where: { taskId } });
    if (labelIds.length) {
      await this.prisma.taskLabel.createMany({
        data: labelIds.map((labelId) => ({ taskId, labelId })),
      });
    }
  }

  // ---- Checklist ----

  async createChecklistItem(taskId: string, title: string, order: number) {
    return this.prisma.checklistItem.create({ data: { taskId, title, order } });
  }

  async updateChecklistItem(id: string, data: Record<string, unknown>) {
    return this.prisma.checklistItem.update({ where: { id }, data });
  }

  async deleteChecklistItem(id: string) {
    return this.prisma.checklistItem.delete({ where: { id } });
  }

  // ---- Comentários ----

  async createComment(data: {
    content: string;
    taskId: string;
    authorId: string;
    parentId?: string;
  }) {
    return this.prisma.comment.create({ data, include: { author: { include: { profile: true } } } });
  }

  async updateComment(id: string, content: string, userId: string) {
    const comment = await this.prisma.comment.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException('Comentário não encontrado');
    if (comment.authorId !== userId) {
      throw new NotFoundException('Sem permissão para editar este comentário');
    }
    return this.prisma.comment.update({ where: { id }, data: { content } });
  }

  async deleteComment(id: string, userId: string) {
    const comment = await this.prisma.comment.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException('Comentário não encontrado');
    if (comment.authorId !== userId) {
      throw new NotFoundException('Sem permissão para excluir este comentário');
    }
    return this.prisma.comment.delete({ where: { id } });
  }
}
