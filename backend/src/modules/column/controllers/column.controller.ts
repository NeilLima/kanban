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

import { ColumnService } from '../services/column.service.js';
import { CreateColumnDto, UpdateColumnDto } from '../dto/column.dto.js';
import { AuthGuard } from '../../../common/guards/auth.guard.js';
import { GetUser } from '../../../common/decorators/get-user.decorator.js';

@Controller('columns')
@UseGuards(AuthGuard)
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Get()
  findAll(@GetUser('userId') userId: string) {
    return this.columnService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser('userId') userId: string) {
    return this.columnService.findOne(id, userId);
  }

  @Post()
  create(@GetUser('userId') userId: string, @Body() dto: CreateColumnDto) {
    return this.columnService.create(userId, dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @GetUser('userId') userId: string,
    @Body() dto: UpdateColumnDto,
  ) {
    return this.columnService.update(id, userId, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser('userId') userId: string) {
    return this.columnService.remove(id, userId);
  }
}