/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';

import { TaskService } from '../services/task.service.js';
import { CreateTaskDto, UpdateTaskDto, MoveTaskDto, UploadAttachmentDto } from '../dto/task.dto.js';
import { AuthGuard } from '../../../common/guards/auth.guard.js';
import { GetUser } from '../../../common/decorators/get-user.decorator.js';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser('userId') userId: string) {
    return this.taskService.findOne(id, userId);
  }

  @Post()
  create(@GetUser('userId') userId: string, @Body() dto: CreateTaskDto) {
    return this.taskService.create(userId, dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @GetUser('userId') userId: string,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.taskService.update(id, userId, dto);
  }

  /** Drag and drop: mover tarefa para outra coluna */
  @Patch(':id/move')
  move(
    @Param('id') id: string,
    @GetUser('userId') userId: string,
    @Body() dto: MoveTaskDto,
  ) {
    return this.taskService.move(id, userId, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser('userId') userId: string) {
    return this.taskService.remove(id, userId);
  }

  @Get(':id/history')
  getHistory(@Param('id') id: string, @GetUser('userId') userId: string) {
    return this.taskService.getHistory(id, userId);
  }

  // ---- Checklist ----

  @Post(':id/checklist')
  addChecklistItem(
    @Param('id') id: string,
    @GetUser('userId') userId: string,
    @Body() body: { title: string },
  ) {
    return this.taskService.addChecklistItem(id, userId, body.title);
  }

  @Patch('checklist/:itemId')
  updateChecklistItem(
    @Param('itemId') itemId: string,
    @GetUser('userId') userId: string,
    @Body() body: { title?: string; isDone?: boolean },
  ) {
    return this.taskService.updateChecklistItem(itemId, userId, body);
  }

  @Delete('checklist/:itemId')
  removeChecklistItem(
    @Param('itemId') itemId: string,
    @GetUser('userId') userId: string,
  ) {
    return this.taskService.removeChecklistItem(itemId, userId);
  }

  // ---- Comentários ----

  @Post(':id/comments')
  addComment(
    @Param('id') id: string,
    @GetUser('userId') userId: string,
    @Body() body: { content: string; parentId?: string },
  ) {
    return this.taskService.addComment(id, userId, body.content, body.parentId);
  }

  @Patch('comments/:commentId')
  updateComment(
    @Param('commentId') commentId: string,
    @GetUser('userId') userId: string,
    @Body() body: { content: string },
  ) {
    return this.taskService.updateComment(commentId, userId, body.content);
  }

  @Delete('comments/:commentId')
  removeComment(
    @Param('commentId') commentId: string,
    @GetUser('userId') userId: string,
  ) {
    return this.taskService.removeComment(commentId, userId);
  }

  // ---- Anexos ----

  @Post(':id/attachments')
  uploadAttachment(
    @Param('id') id: string,
    @GetUser('userId') userId: string,
    @Body() dto: UploadAttachmentDto,
  ) {
    return this.taskService.uploadAttachment(id, userId, dto);
  }

  @Get(':id/attachments')
  listAttachments(
    @Param('id') id: string,
    @GetUser('userId') userId: string,
  ) {
    return this.taskService.listAttachments(id, userId);
  }

  /** Download/preview do arquivo — imagens e PDF abrem inline no browser */
  @Get('attachments/:attachmentId/file')
  async getAttachmentFile(
    @Param('attachmentId') attachmentId: string,
    @GetUser('userId') userId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const file = await this.taskService.getAttachmentFile(attachmentId, userId);
    const inline =
      file.mimeType.startsWith('image/') ||
      file.mimeType === 'application/pdf' ||
      file.mimeType === 'text/plain';
    res.setHeader('Content-Type', file.mimeType);
    res.setHeader(
      'Content-Disposition',
      `${inline ? 'inline' : 'attachment'}; filename*=UTF-8''${encodeURIComponent(file.fileName)}`,
    );
    res.setHeader('Content-Length', file.buffer.length);
    res.setHeader('Cache-Control', 'private, max-age=300');
    return new StreamableFile(file.buffer);
  }

  @Delete('attachments/:attachmentId')
  deleteAttachment(
    @Param('attachmentId') attachmentId: string,
    @GetUser('userId') userId: string,
  ) {
    return this.taskService.deleteAttachment(attachmentId, userId);
  }
}
