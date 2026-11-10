/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { NotificationService } from '../services/notification.service.js';
import { CreateNotificationDto, UpdateNotificationDto } from '../dto/notification.dto.js';
import { AuthGuard } from '../../../common/guards/auth.guard.js';
import { GetUser } from '../../../common/decorators/get-user.decorator.js';

@Controller('notifications')
@UseGuards(AuthGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  findAll(@GetUser('userId') userId: string) {
    return this.notificationService.findAll(userId);
  }

  @Get('unread-count')
  getUnreadCount(@GetUser('userId') userId: string) {
    return this.notificationService.getUnreadCount(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser('userId') userId: string) {
    return this.notificationService.findOne(id, userId);
  }

  @Post()
  create(@GetUser('userId') userId: string, @Body() dto: CreateNotificationDto) {
    return this.notificationService.create(userId, dto);
  }

  @Patch(':id/read')
  markAsRead(@Param('id') id: string, @GetUser('userId') userId: string) {
    return this.notificationService.markAsRead(id, userId);
  }

  @Patch('read-all')
  markAllAsRead(@GetUser('userId') userId: string) {
    return this.notificationService.markAllAsRead(userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser('userId') userId: string) {
    return this.notificationService.remove(id, userId);
  }

  @Delete()
  removeAll(@GetUser('userId') userId: string) {
    return this.notificationService.removeAll(userId);
  }
}