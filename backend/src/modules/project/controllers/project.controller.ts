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

import { ProjectService } from '../services/project.service';
import {
  CreateProjectDto,
  UpdateProjectDto,
  CreateColumnDto,
  UpdateColumnDto,
} from '../dto/project.dto';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { GetUser } from '../../../common/decorators/get-user.decorator';

@Controller('projects')
@UseGuards(AuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  findAll(@GetUser('userId') userId: string) {
    return this.projectService.findAllForUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser('userId') userId: string) {
    return this.projectService.findOne(id, userId);
  }

  @Post()
  create(@GetUser('userId') userId: string, @Body() dto: CreateProjectDto) {
    return this.projectService.create(userId, dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @GetUser('userId') userId: string,
    @Body() dto: UpdateProjectDto,
  ) {
    return this.projectService.update(id, userId, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser('userId') userId: string) {
    return this.projectService.remove(id, userId);
  }

  // ---- Equipe (apenas OWNER/ADMIN) ----

  @Post(':id/members')
  addMember(
    @Param('id') id: string,
    @GetUser('userId') userId: string,
    @Body() body: { email: string },
  ) {
    return this.projectService.addMember(id, userId, body.email);
  }

  @Delete(':id/members/:memberUserId')
  removeMember(
    @Param('id') id: string,
    @GetUser('userId') userId: string,
    @Param('memberUserId') memberUserId: string,
  ) {
    return this.projectService.removeMember(id, userId, memberUserId);
  }

  // ---- Board (colunas + tarefas) ----

  @Get(':id/board')
  getBoard(@Param('id') id: string, @GetUser('userId') userId: string) {
    return this.projectService.getBoard(id, userId);
  }

  // ---- Colunas ----

  @Post(':id/columns')
  createColumn(
    @Param('id') id: string,
    @GetUser('userId') userId: string,
    @Body() dto: CreateColumnDto,
  ) {
    return this.projectService.createColumn(id, userId, dto);
  }

  @Patch('columns/:columnId')
  updateColumn(
    @Param('columnId') columnId: string,
    @GetUser('userId') userId: string,
    @Body() dto: UpdateColumnDto,
  ) {
    return this.projectService.updateColumn(columnId, userId, dto);
  }

  @Delete('columns/:columnId')
  removeColumn(
    @Param('columnId') columnId: string,
    @GetUser('userId') userId: string,
  ) {
    return this.projectService.removeColumn(columnId, userId);
  }
}
