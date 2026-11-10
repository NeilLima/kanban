var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ProjectService_1;
import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from '../repository/project.repository.js';
let ProjectService = ProjectService_1 = class ProjectService {
    projectRepository;
    logger = new Logger(ProjectService_1.name);
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    create(userId, dto) {
        this.logger.log(`Criando projeto "${dto.name}" para o usuário ${userId}`);
        return this.projectRepository.create({ ...dto, ownerId: userId });
    }
    findAllForUser(userId) {
        return this.projectRepository.findAllForUser(userId).then((projects) => projects.map((project) => {
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
                    name: `${member.user.profile?.firstName ?? ''} ${member.user.profile?.lastName ?? ''}`.trim() ||
                        member.user.email,
                })),
            };
        }));
    }
    async findOne(projectId, userId) {
        await this.projectRepository.assertAccess(projectId, userId);
        return this.projectRepository.findById(projectId);
    }
    async update(projectId, userId, dto) {
        await this.projectRepository.assertAdmin(projectId, userId);
        return this.projectRepository.update(projectId, { ...dto });
    }
    async remove(projectId, userId) {
        await this.projectRepository.assertAdmin(projectId, userId);
        return this.projectRepository.delete(projectId);
    }
    async addMember(projectId, userId, email) {
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
        const nome = `${alvo.profile?.firstName ?? ''} ${alvo.profile?.lastName ?? ''}`.trim() ||
            alvo.email;
        return {
            id: membro.id,
            userId: membro.userId,
            role: membro.role,
            name: nome,
            email: alvo.email,
        };
    }
    async removeMember(projectId, userId, memberUserId) {
        await this.projectRepository.assertAdmin(projectId, userId);
        const existente = await this.projectRepository.findMember(projectId, memberUserId);
        if (!existente) {
            throw new NotFoundException('Membro não encontrado');
        }
        await this.projectRepository.removeMember(projectId, memberUserId);
        return { removed: true };
    }
    async getBoard(projectId, userId) {
        await this.projectRepository.assertAccess(projectId, userId);
        return this.projectRepository.findBoard(projectId);
    }
    async createColumn(projectId, userId, dto) {
        await this.projectRepository.assertAccess(projectId, userId);
        return this.projectRepository.createColumn(projectId, dto.name, dto.color);
    }
    async updateColumn(columnId, userId, dto) {
        const column = await this.projectRepository.findColumnById(columnId);
        if (!column) {
            throw new NotFoundException('Coluna não encontrada');
        }
        await this.projectRepository.assertAccess(column.projectId, userId);
        return this.projectRepository.updateColumn(columnId, { ...dto });
    }
    async removeColumn(columnId, userId) {
        const column = await this.projectRepository.findColumnById(columnId);
        if (!column) {
            throw new NotFoundException('Coluna não encontrada');
        }
        await this.projectRepository.assertAccess(column.projectId, userId);
        return this.projectRepository.deleteColumn(columnId);
    }
};
ProjectService = ProjectService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ProjectRepository])
], ProjectService);
export { ProjectService };
//# sourceMappingURL=project.service.js.map