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
var TaskService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const task_repository_1 = require("../repository/task.repository");
const project_repository_1 = require("../../project/repository/project.repository");
let TaskService = TaskService_1 = class TaskService {
    taskRepository;
    projectRepository;
    logger = new common_1.Logger(TaskService_1.name);
    constructor(taskRepository, projectRepository) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
    }
    async create(userId, dto) {
        let columnId = dto.columnId;
        let projectId = dto.projectId;
        if (!columnId && projectId) {
            const board = await this.projectRepository.findBoard(projectId);
            const firstColumn = board?.columns?.[0];
            if (!firstColumn) {
                throw new common_1.ForbiddenException('Projeto não possui colunas');
            }
            columnId = firstColumn.id;
        }
        if (!columnId) {
            throw new common_1.ForbiddenException('Coluna é obrigatória');
        }
        const column = await this.taskRepository.findColumnById(columnId);
        if (!column) {
            throw new common_1.ForbiddenException('Coluna não encontrada');
        }
        projectId = column.projectId;
        await this.projectRepository.assertAccess(projectId, userId);
        this.logger.log(`Criando tarefa "${dto.title}" na coluna ${columnId}`);
        const dueDate = dto.dueDate ? new Date(dto.dueDate) : undefined;
        return this.taskRepository.create({
            ...dto,
            columnId,
            projectId,
            dueDate,
            creatorId: userId,
        });
    }
    async findOne(taskId, userId) {
        const task = await this.taskRepository.findDetailById(taskId);
        await this.projectRepository.assertAccess(task.projectId, userId);
        return task;
    }
    async update(taskId, userId, dto) {
        const task = await this.taskRepository.findTaskById(taskId);
        if (!task)
            throw new common_1.ForbiddenException('Tarefa não encontrada');
        await this.projectRepository.assertAccess(task.projectId, userId);
        const { assigneeIds, labelIds, dueDate, ...rest } = dto;
        const data = { ...rest };
        if (dueDate !== undefined)
            data.dueDate = dueDate ? new Date(dueDate) : null;
        if (dto.status && dto.status !== task.status) {
            await this.taskRepository.logHistory({
                taskId, userId, field: 'status',
                oldValue: task.status, newValue: dto.status,
            });
            if (dto.status === 'DONE')
                data.progress = 100;
        }
        if (dto.priority && dto.priority !== task.priority) {
            await this.taskRepository.logHistory({
                taskId, userId, field: 'priority',
                oldValue: task.priority, newValue: dto.priority,
            });
        }
        if (assigneeIds)
            await this.taskRepository.replaceAssignees(taskId, assigneeIds);
        if (labelIds)
            await this.taskRepository.replaceLabels(taskId, labelIds);
        return this.taskRepository.update(taskId, data);
    }
    async move(taskId, userId, dto) {
        const task = await this.taskRepository.findTaskById(taskId);
        if (!task)
            throw new common_1.ForbiddenException('Tarefa não encontrada');
        await this.projectRepository.assertAccess(task.projectId, userId);
        const targetColumn = await this.taskRepository.findColumnById(dto.columnId);
        if (!targetColumn)
            throw new common_1.ForbiddenException('Coluna de destino não encontrada');
        if (dto.columnId !== task.columnId) {
            await this.taskRepository.logHistory({
                taskId, userId, field: 'column',
                oldValue: task.columnId, newValue: dto.columnId,
            });
            const statusByColumn = {
                'A Fazer': 'TODO',
                'Em Desenvolvimento': 'IN_PROGRESS',
                'Em Revisão': 'REVIEW',
                'Concluído': 'DONE',
            };
            const newStatus = statusByColumn[targetColumn.name];
            if (newStatus && newStatus !== task.status) {
                await this.taskRepository.logHistory({
                    taskId, userId, field: 'status',
                    oldValue: task.status, newValue: newStatus,
                });
                return this.taskRepository.update(taskId, {
                    columnId: dto.columnId,
                    order: dto.order ?? task.order,
                    status: newStatus,
                    ...(newStatus === 'DONE' ? { progress: 100 } : {}),
                });
            }
        }
        return this.taskRepository.update(taskId, {
            columnId: dto.columnId,
            order: dto.order ?? task.order,
        });
    }
    async remove(taskId, userId) {
        const task = await this.taskRepository.findTaskById(taskId);
        if (!task)
            throw new common_1.ForbiddenException('Tarefa não encontrada');
        await this.projectRepository.assertAccess(task.projectId, userId);
        return this.taskRepository.delete(taskId);
    }
    async addChecklistItem(taskId, userId, title) {
        const task = await this.taskRepository.findTaskById(taskId);
        if (!task)
            throw new common_1.ForbiddenException('Tarefa não encontrada');
        await this.projectRepository.assertAccess(task.projectId, userId);
        const detail = await this.taskRepository.findDetailById(taskId);
        const order = detail.checklistItems.length;
        return this.taskRepository.createChecklistItem(taskId, title, order);
    }
    async updateChecklistItem(itemId, userId, data) {
        const item = await this.taskRepository.updateChecklistItem(itemId, { ...data });
        const task = await this.taskRepository.findTaskById(item.taskId);
        if (task)
            await this.projectRepository.assertAccess(task.projectId, userId);
        await this.recalculateProgress(item.taskId);
        return item;
    }
    async removeChecklistItem(itemId, userId) {
        await this.taskRepository.deleteChecklistItem(itemId);
        return { success: true };
    }
    async recalculateProgress(taskId) {
        const detail = await this.taskRepository.findDetailById(taskId);
        const items = detail.checklistItems;
        if (items.length > 0) {
            const done = items.filter((i) => i.isDone).length;
            const progress = Math.round((done / items.length) * 100);
            await this.taskRepository.update(taskId, { progress });
        }
    }
    async addComment(taskId, userId, content, parentId) {
        const task = await this.taskRepository.findTaskById(taskId);
        if (!task)
            throw new common_1.ForbiddenException('Tarefa não encontrada');
        await this.projectRepository.assertAccess(task.projectId, userId);
        return this.taskRepository.createComment({ content, taskId, authorId: userId, parentId });
    }
    async updateComment(commentId, userId, content) {
        return this.taskRepository.updateComment(commentId, content, userId);
    }
    async removeComment(commentId, userId) {
        await this.taskRepository.deleteComment(commentId, userId);
        return { success: true };
    }
    async getHistory(taskId, userId) {
        const task = await this.taskRepository.findTaskById(taskId);
        if (!task)
            throw new common_1.ForbiddenException('Tarefa não encontrada');
        await this.projectRepository.assertAccess(task.projectId, userId);
        return this.taskRepository.findHistory(taskId);
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = TaskService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [task_repository_1.TaskRepository,
        project_repository_1.ProjectRepository])
], TaskService);
//# sourceMappingURL=task.service.js.map