var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';
const TASK_INCLUDE = {
    assignees: { include: { user: { include: { profile: true } } } },
    labels: { include: { label: true } },
    checklistItems: { orderBy: { order: 'asc' } },
    _count: { select: { comments: true, attachments: true } },
};
let TaskRepository = class TaskRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findTaskById(id) {
        return this.prisma.task.findUnique({ where: { id } });
    }
    async findColumnById(id) {
        return this.prisma.column.findUnique({ where: { id } });
    }
    async findDetailById(id) {
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
        if (!task)
            throw new NotFoundException('Tarefa não encontrada');
        return task;
    }
    async create(data) {
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
                status: data.status ?? 'TODO',
                priority: data.priority ?? 'MEDIUM',
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
    async update(id, data) {
        return this.prisma.task.update({
            where: { id },
            data,
            include: TASK_INCLUDE,
        });
    }
    async delete(id) {
        return this.prisma.task.delete({ where: { id } });
    }
    async findHistory(taskId) {
        return this.prisma.taskHistory.findMany({
            where: { taskId },
            include: { user: { include: { profile: true } } },
            orderBy: { createdAt: 'desc' },
            take: 50,
        });
    }
    async logHistory(data) {
        return this.prisma.taskHistory.create({ data });
    }
    async replaceAssignees(taskId, userIds) {
        await this.prisma.taskAssignee.deleteMany({ where: { taskId } });
        if (userIds.length) {
            await this.prisma.taskAssignee.createMany({
                data: userIds.map((userId) => ({ taskId, userId })),
            });
        }
    }
    async replaceLabels(taskId, labelIds) {
        await this.prisma.taskLabel.deleteMany({ where: { taskId } });
        if (labelIds.length) {
            await this.prisma.taskLabel.createMany({
                data: labelIds.map((labelId) => ({ taskId, labelId })),
            });
        }
    }
    async createChecklistItem(taskId, title, order) {
        return this.prisma.checklistItem.create({ data: { taskId, title, order } });
    }
    async updateChecklistItem(id, data) {
        return this.prisma.checklistItem.update({ where: { id }, data });
    }
    async deleteChecklistItem(id) {
        return this.prisma.checklistItem.delete({ where: { id } });
    }
    async createComment(data) {
        return this.prisma.comment.create({ data, include: { author: { include: { profile: true } } } });
    }
    async updateComment(id, content, userId) {
        const comment = await this.prisma.comment.findUnique({ where: { id } });
        if (!comment)
            throw new NotFoundException('Comentário não encontrado');
        if (comment.authorId !== userId) {
            throw new NotFoundException('Sem permissão para editar este comentário');
        }
        return this.prisma.comment.update({ where: { id }, data: { content } });
    }
    async deleteComment(id, userId) {
        const comment = await this.prisma.comment.findUnique({ where: { id } });
        if (!comment)
            throw new NotFoundException('Comentário não encontrado');
        if (comment.authorId !== userId) {
            throw new NotFoundException('Sem permissão para excluir este comentário');
        }
        return this.prisma.comment.delete({ where: { id } });
    }
};
TaskRepository = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], TaskRepository);
export { TaskRepository };
//# sourceMappingURL=task.repository.js.map