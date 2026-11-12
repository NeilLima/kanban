/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger, ForbiddenException, BadRequestException, NotFoundException } from '@nestjs/common';

import { TaskRepository } from '../repository/task.repository.js';
import { ProjectRepository } from '../../project/repository/project.repository.js';
import { CreateTaskDto, UpdateTaskDto, MoveTaskDto, UploadAttachmentDto } from '../dto/task.dto.js';

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
    const { tagNames: _tagNames, ...rest } = dto;
    const task = await this.taskRepository.create({
      ...rest,
      columnId,
      projectId,
      dueDate,
      creatorId: userId,
    });

    /** 🏷️ tagNames digitados → Label do projeto (cria se não existir) */
    const labelIds = await this.resolveLabelIds(projectId, dto);
    if (labelIds) await this.taskRepository.replaceLabels(task.id, labelIds);

    return task;
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
    const resolvedLabelIds = await this.resolveLabelIds(task.projectId, dto);
    if (resolvedLabelIds) await this.taskRepository.replaceLabels(taskId, resolvedLabelIds);

    return this.taskRepository.update(taskId, data);
  }

  /** Paleta para etiquetas criadas automaticamente a partir de tagNames */
  private static readonly LABEL_COLORS = [
    '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981',
    '#ef4444', '#06b6d4', '#f97316', '#84cc16', '#a855f7',
  ];

  /** Resolve labelIds + tagNames em IDs de Label do projeto.
   *  Retorna undefined quando nenhum dos dois foi informado. */
  private async resolveLabelIds(
    projectId: string,
    dto: { labelIds?: string[]; tagNames?: string[] },
  ): Promise<string[] | undefined> {
    const { labelIds, tagNames } = dto;
    if (!labelIds?.length && !tagNames?.length) return undefined;

    const ids = new Set<string>(labelIds ?? []);
    const names = (tagNames ?? [])
      .map((n) => n.trim())
      .filter((n) => n.length > 0 && n.length <= 50)
      .slice(0, 10);

    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      const existing = await this.taskRepository.findLabelByName(projectId, name);
      if (existing) {
        ids.add(existing.id);
        continue;
      }
      const color = TaskService.LABEL_COLORS[i % TaskService.LABEL_COLORS.length];
      const created = await this.taskRepository.createLabel(projectId, name, color);
      ids.add(created.id);
    }
    return [...ids];
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

  // ---- Anexos ----

  /** MIME types aceitos em anexos de tarefa (imagens, docs, planilhas, zip, mídia) */
  private static readonly ALLOWED_MIME = new Set([
    'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
    'application/pdf',
    'application/zip', 'application/x-zip-compressed',
    'text/plain', 'text/csv',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/json',
    'video/mp4', 'video/webm', 'video/quicktime',
    'audio/mpeg', 'audio/mp4', 'audio/wav', 'audio/ogg',
  ]);

  /** Teto de ~3MB por arquivo — serverless (Vercel) limita o body JSON a
   *  ~4.5MB e o base64 infla ~33% */
  private static readonly MAX_BASE64_LENGTH = 4_200_000;

  /** Normaliza o base64 recebido (aceita com ou sem prefixo data:) */
  private normalizeBase64(data: string): string {
    const trimmed = data.trim();
    const comma = trimmed.indexOf(',');
    if (trimmed.startsWith('data:') && comma !== -1) {
      return trimmed.slice(comma + 1);
    }
    return trimmed;
  }

  async uploadAttachment(taskId: string, userId: string, dto: UploadAttachmentDto) {
    const task = await this.taskRepository.findTaskById(taskId);
    if (!task) throw new ForbiddenException('Tarefa não encontrada');
    await this.projectRepository.assertAccess(task.projectId, userId);

    const mimeType = dto.mimeType.split(';')[0].trim().toLowerCase();
    if (!TaskService.ALLOWED_MIME.has(mimeType)) {
      throw new BadRequestException(`Tipo de arquivo não suportado: ${mimeType}`);
    }

    const base64 = this.normalizeBase64(dto.data);
    if (!base64 || base64.length > TaskService.MAX_BASE64_LENGTH) {
      throw new BadRequestException('Arquivo muito grande (máx. ~3MB) ou conteúdo inválido');
    }

    const buffer = Buffer.from(base64, 'base64');
    if (buffer.length === 0) {
      throw new BadRequestException('Conteúdo do arquivo inválido');
    }

    const attachment = await this.taskRepository.createAttachment({
      taskId,
      fileName: dto.fileName.slice(0, 255),
      mimeType,
      size: buffer.length,
      /** storageKey guarda o base64 puro — download decodifica sob demanda */
      storageKey: base64,
      uploadedById: userId,
    });

    this.logger.log(`Anexo "${dto.fileName}" (${buffer.length}B) enviado para tarefa ${taskId}`);
    return {
      id: attachment.id,
      fileName: attachment.fileName,
      mimeType: attachment.mimeType,
      size: attachment.size,
      uploadedById: attachment.uploadedById,
      createdAt: attachment.createdAt,
    };
  }

  async listAttachments(taskId: string, userId: string) {
    const task = await this.taskRepository.findTaskById(taskId);
    if (!task) throw new ForbiddenException('Tarefa não encontrada');
    await this.projectRepository.assertAccess(task.projectId, userId);
    const items = await this.taskRepository.findAttachmentsByTask(taskId);
    return items.map((a) => ({
      id: a.id,
      fileName: a.fileName,
      mimeType: a.mimeType,
      size: a.size,
      uploadedById: a.uploadedById,
      createdAt: a.createdAt,
    }));
  }

  /** Retorna o arquivo decodificado para download/preview */
  async getAttachmentFile(attachmentId: string, userId: string) {
    const attachment = await this.taskRepository.findAttachmentById(attachmentId);
    if (!attachment) throw new NotFoundException('Anexo não encontrado');
    await this.projectRepository.assertAccess(attachment.task.projectId, userId);
    return {
      buffer: Buffer.from(attachment.storageKey, 'base64'),
      mimeType: attachment.mimeType,
      fileName: attachment.fileName,
    };
  }

  async deleteAttachment(attachmentId: string, userId: string) {
    const attachment = await this.taskRepository.findAttachmentById(attachmentId);
    if (!attachment) throw new NotFoundException('Anexo não encontrado');
    await this.projectRepository.assertAccess(attachment.task.projectId, userId);
    /** Só o autor do upload ou o criador da tarefa podem excluir */
    if (attachment.uploadedById !== userId && attachment.task.creatorId !== userId) {
      throw new ForbiddenException('Sem permissão para excluir este anexo');
    }
    await this.taskRepository.deleteAttachment(attachmentId);
    return { success: true };
  }
}
