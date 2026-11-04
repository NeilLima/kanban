/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger, ForbiddenException } from '@nestjs/common';

import { TaskRepository } from '../repository/task.repository';
import { ProjectRepository } from '../../project/repository/project.repository';
import { CreateTaskDto, UpdateTaskDto, MoveTaskDto } from '../dto/task.dto';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly projectRepository: ProjectRepository,
  ) {}

  async create(userId: string, dto: CreateTaskDto) {
    let columnId = dto.columnId;
    let projectId = dto.projectId;

    // Se não informou columnId, mas informou projectId, usa a primeira coluna do projeto
    if (!columnId && projectId) {
      const board = await this.projectRepository.findBoard(projectId);
      const firstColumn = board?.columns?.[0];
      if (!firstColumn) {
        throw new ForbiddenException('Projeto não possui colunas');
      }
      columnId = firstColumn.id;
    }

    if (!columnId) {
      throw new ForbiddenException('Coluna é obrigatória');
    }

    const column = await this.taskRepository.findColumnById(columnId);
    if (!column) {
      throw new ForbiddenException('Coluna não encontrada');
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

  async findOne(taskId: string, userId: string) {
    const task = await this.taskRepository.findDetailById(taskId);
    await this.projectRepository.assertAccess(task.projectId, userId);
    return task;
  }

  async update(taskId: string, userId: string, dto: UpdateTaskDto) {
    const task = await this.taskRepository.findTaskById(taskId);
    if (!task) throw new ForbiddenException('Tarefa não encontrada');
    await this.projectRepository.assertAccess(task.projectId, userId);

    const { assigneeIds, labelIds, dueDate, ...rest } = dto;
    const data: Record<string, unknown> = { ...rest };
    if (dueDate !== undefined) data.dueDate = dueDate ? new Date(dueDate) : null;

    // Registrar mudanças no histórico
    if (dto.status && dto.status !== task.status) {
      await this.taskRepository.logHistory({
        taskId, userId, field: 'status',
        oldValue: task.status, newValue: dto.status,
      });
      if (dto.status === 'DONE') data.progress = 100;
    }
    if (dto.priority && dto.priority !== task.priority) {
      await this.taskRepository.logHistory({
        taskId, userId, field: 'priority',
        oldValue: task.priority, newValue: dto.priority,
      });
    }

    if (assigneeIds) await this.taskRepository.replaceAssignees(taskId, assigneeIds);
    if (labelIds) await this.taskRepository.replaceLabels(taskId, labelIds);

    return this.taskRepository.update(taskId, data);
  }

  /** Mover tarefa entre colunas (drag and drop) */
  async move(taskId: string, userId: string, dto: MoveTaskDto) {
    const task = await this.taskRepository.findTaskById(taskId);
    if (!task) throw new ForbiddenException('Tarefa não encontrada');
    await this.projectRepository.assertAccess(task.projectId, userId);

    const targetColumn = await this.taskRepository.findColumnById(dto.columnId);
    if (!targetColumn) throw new ForbiddenException('Coluna de destino não encontrada');

    if (dto.columnId !== task.columnId) {
      await this.taskRepository.logHistory({
        taskId, userId, field: 'column',
        oldValue: task.columnId, newValue: dto.columnId,
      });
      // Mapear nome da coluna -> status
      const statusByColumn: Record<string, string> = {
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

  async remove(taskId: string, userId: string) {
    const task = await this.taskRepository.findTaskById(taskId);
    if (!task) throw new ForbiddenException('Tarefa não encontrada');
    await this.projectRepository.assertAccess(task.projectId, userId);
    return this.taskRepository.delete(taskId);
  }

  // ---- Checklist ----

  async addChecklistItem(taskId: string, userId: string, title: string) {
    const task = await this.taskRepository.findTaskById(taskId);
    if (!task) throw new ForbiddenException('Tarefa não encontrada');
    await this.projectRepository.assertAccess(task.projectId, userId);
    const detail = await this.taskRepository.findDetailById(taskId);
    const order = detail.checklistItems.length;
    return this.taskRepository.createChecklistItem(taskId, title, order);
  }

  async updateChecklistItem(itemId: string, userId: string, data: { title?: string; isDone?: boolean }) {
    const item = await this.taskRepository.updateChecklistItem(itemId, { ...data });
    const task = await this.taskRepository.findTaskById(item.taskId);
    if (task) await this.projectRepository.assertAccess(task.projectId, userId);
    await this.recalculateProgress(item.taskId);
    return item;
  }

  async removeChecklistItem(itemId: string, userId: string) {
    await this.taskRepository.deleteChecklistItem(itemId);
    return { success: true };
  }

  /** Recalcula o progresso da tarefa com base no checklist */
  private async recalculateProgress(taskId: string) {
    const detail = await this.taskRepository.findDetailById(taskId);
    const items = detail.checklistItems;
    if (items.length > 0) {
      const done = items.filter((i) => i.isDone).length;
      const progress = Math.round((done / items.length) * 100);
      await this.taskRepository.update(taskId, { progress });
    }
  }

  // ---- Comentários ----

  async addComment(taskId: string, userId: string, content: string, parentId?: string) {
    const task = await this.taskRepository.findTaskById(taskId);
    if (!task) throw new ForbiddenException('Tarefa não encontrada');
    await this.projectRepository.assertAccess(task.projectId, userId);
    return this.taskRepository.createComment({ content, taskId, authorId: userId, parentId });
  }

  async updateComment(commentId: string, userId: string, content: string) {
    return this.taskRepository.updateComment(commentId, content, userId);
  }

  async removeComment(commentId: string, userId: string) {
    await this.taskRepository.deleteComment(commentId, userId);
    return { success: true };
  }

  async getHistory(taskId: string, userId: string) {
    const task = await this.taskRepository.findTaskById(taskId);
    if (!task) throw new ForbiddenException('Tarefa não encontrada');
    await this.projectRepository.assertAccess(task.projectId, userId);
    return this.taskRepository.findHistory(taskId);
  }
}
