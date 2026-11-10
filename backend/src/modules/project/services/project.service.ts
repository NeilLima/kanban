/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';

import { ProjectRepository } from '../repository/project.repository.js';
import {
  CreateProjectDto,
  UpdateProjectDto,
  CreateColumnDto,
  UpdateColumnDto,
} from '../dto/project.dto.js';

@Injectable()
export class ProjectService {
  private readonly logger = new Logger(ProjectService.name);

  constructor(private readonly projectRepository: ProjectRepository) {}

  create(userId: string, dto: CreateProjectDto) {
    this.logger.log(`Criando projeto "${dto.name}" para o usuário ${userId}`);
    return this.projectRepository.create({ ...dto, ownerId: userId });
  }

  findAllForUser(userId: string) {
    return this.projectRepository.findAllForUser(userId).then((projects) =>
      projects.map((project) => {
        const tasksTotal = project.tasks.length;
        const tasksDone = project.tasks.filter((task) => task.status === 'DONE').length;
        return {
          id: project.id,
          name: project.name,
          description: project.description,
          color: project.color,
          icon: project.icon,
          status: project.status,
          isFavorite: project.isFavorite,
          isArchived: project.isArchived,
          order: project.order,
          ownerId: project.ownerId,
          createdAt: project.createdAt,
          updatedAt: project.updatedAt,
          columns: project.columns,
          tasksTotal,
          tasksDone,
          progress: tasksTotal > 0 ? Math.round((tasksDone / tasksTotal) * 100) : 0,
          members: project.members.map((member) => ({
            id: member.id,
            userId: member.userId,
            role: member.role,
            name:
              `${member.user.profile?.firstName ?? ''} ${member.user.profile?.lastName ?? ''}`.trim() ||
              member.user.email,
          })),
        };
      }),
    );
  }

  async findOne(projectId: string, userId: string) {
    await this.projectRepository.assertAccess(projectId, userId);
    return this.projectRepository.findById(projectId);
  }

  async update(projectId: string, userId: string, dto: UpdateProjectDto) {
    await this.projectRepository.assertAdmin(projectId, userId);
    return this.projectRepository.update(projectId, { ...dto });
  }

  async remove(projectId: string, userId: string) {
    await this.projectRepository.assertAdmin(projectId, userId);
    return this.projectRepository.delete(projectId);
  }

  /** Adicionar membro à equipe do projeto (apenas OWNER/ADMIN) */
  async addMember(projectId: string, userId: string, email: string) {
    await this.projectRepository.assertAdmin(projectId, userId);
    const alvo = await this.projectRepository.findUserByEmail(email.trim().toLowerCase());
    if (!alvo) {
      throw new NotFoundException('Nenhum usuário encontrado com este e-mail');
    }
    const existente = await this.projectRepository.findMember(projectId, alvo.id);
    if (existente) {
      throw new BadRequestException('Este usuário já faz parte da equipe');
    }
    const membro = await this.projectRepository.addMember(projectId, alvo.id);
    const nome =
      `${alvo.profile?.firstName ?? ''} ${alvo.profile?.lastName ?? ''}`.trim() ||
      alvo.email;
    return {
      id: membro.id,
      userId: membro.userId,
      role: membro.role,
      name: nome,
      email: alvo.email,
    };
  }

  /** Remover membro da equipe (apenas OWNER/ADMIN) */
  async removeMember(projectId: string, userId: string, memberUserId: string) {
    await this.projectRepository.assertAdmin(projectId, userId);
    const existente = await this.projectRepository.findMember(projectId, memberUserId);
    if (!existente) {
      throw new NotFoundException('Membro não encontrado');
    }
    await this.projectRepository.removeMember(projectId, memberUserId);
    return { removed: true };
  }

  async getBoard(projectId: string, userId: string) {
    await this.projectRepository.assertAccess(projectId, userId);
    return this.projectRepository.findBoard(projectId);
  }

  async createColumn(projectId: string, userId: string, dto: CreateColumnDto) {
    await this.projectRepository.assertAccess(projectId, userId);
    return this.projectRepository.createColumn(projectId, dto.name, dto.color);
  }

  async updateColumn(columnId: string, userId: string, dto: UpdateColumnDto) {
    const column = await this.projectRepository.findColumnById(columnId);
    if (!column) {
      throw new NotFoundException('Coluna não encontrada');
    }
    await this.projectRepository.assertAccess(column.projectId, userId);
    return this.projectRepository.updateColumn(columnId, { ...dto });
  }

  async removeColumn(columnId: string, userId: string) {
    const column = await this.projectRepository.findColumnById(columnId);
    if (!column) {
      throw new NotFoundException('Coluna não encontrada');
    }
    await this.projectRepository.assertAccess(column.projectId, userId);
    return this.projectRepository.deleteColumn(columnId);
  }
}
