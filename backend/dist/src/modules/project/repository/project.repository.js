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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../core/prisma/prisma.service");
const PROJECT_INCLUDE = {
    members: { include: { user: { include: { profile: true } } } },
    columns: { orderBy: { order: 'asc' } },
};
let ProjectRepository = class ProjectRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.project.create({
            data: {
                name: data.name,
                description: data.description,
                color: data.color ?? '#3b82f6',
                icon: data.icon,
                ownerId: data.ownerId,
                members: {
                    create: { userId: data.ownerId, role: 'OWNER' },
                },
                columns: {
                    create: [
                        { name: 'A Fazer', color: '#3b82f6', order: 0 },
                        { name: 'Em Desenvolvimento', color: '#f59e0b', order: 1 },
                        { name: 'Em Revisão', color: '#8b5cf6', order: 2 },
                        { name: 'Concluído', color: '#10b981', order: 3 },
                    ],
                },
            },
            include: PROJECT_INCLUDE,
        });
    }
    async findAllForUser(userId) {
        return this.prisma.project.findMany({
            where: {
                OR: [
                    { ownerId: userId },
                    { members: { some: { userId } } },
                ],
                isArchived: false,
            },
            include: {
                ...PROJECT_INCLUDE,
                tasks: { select: { status: true } },
            },
            orderBy: { order: 'asc' },
        });
    }
    async findById(id) {
        return this.prisma.project.findUnique({
            where: { id },
            include: PROJECT_INCLUDE,
        });
    }
    async update(id, data) {
        return this.prisma.project.update({
            where: { id },
            data,
            include: PROJECT_INCLUDE,
        });
    }
    async delete(id) {
        return this.prisma.project.delete({ where: { id } });
    }
    async assertAccess(projectId, userId) {
        const project = await this.prisma.project.findUnique({
            where: { id: projectId },
            include: { members: true },
        });
        if (!project) {
            throw new common_1.NotFoundException('Projeto não encontrado');
        }
        const isMember = project.ownerId === userId ||
            project.members.some((m) => m.userId === userId);
        if (!isMember) {
            throw new common_1.ForbiddenException('Sem acesso a este projeto');
        }
        return project;
    }
    async assertAdmin(projectId, userId) {
        const project = await this.prisma.project.findUnique({
            where: { id: projectId },
            include: { members: true },
        });
        if (!project) {
            throw new common_1.NotFoundException('Projeto não encontrado');
        }
        const role = project.members.find((m) => m.userId === userId)?.role;
        const isAdmin = project.ownerId === userId || role === 'OWNER' || role === 'ADMIN';
        if (!isAdmin) {
            throw new common_1.ForbiddenException('Apenas administradores podem executar esta ação');
        }
        return project;
    }
    async findUserByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
            include: { profile: true },
        });
    }
    async findMember(projectId, userId) {
        return this.prisma.projectMember.findUnique({
            where: { projectId_userId: { projectId, userId } },
        });
    }
    async addMember(projectId, userId, role = 'MEMBER') {
        return this.prisma.projectMember.create({
            data: { projectId, userId, role: role },
            include: { user: { include: { profile: true } } },
        });
    }
    async removeMember(projectId, userId) {
        return this.prisma.projectMember.delete({
            where: { projectId_userId: { projectId, userId } },
        });
    }
    async createColumn(projectId, name, color) {
        const last = await this.prisma.column.findFirst({
            where: { projectId },
            orderBy: { order: 'desc' },
        });
        return this.prisma.column.create({
            data: {
                name,
                color: color ?? '#6366f1',
                projectId,
                order: (last?.order ?? -1) + 1,
            },
        });
    }
    async findColumnById(id) {
        return this.prisma.column.findUnique({ where: { id } });
    }
    async updateColumn(id, data) {
        return this.prisma.column.update({ where: { id }, data });
    }
    async deleteColumn(id) {
        return this.prisma.column.delete({ where: { id } });
    }
    async findBoard(projectId) {
        const columns = await this.prisma.column.findMany({
            where: { projectId },
            orderBy: { order: 'asc' },
        });
        const tasks = await this.prisma.task.findMany({
            where: { projectId },
            include: {
                assignees: { include: { user: { include: { profile: true } } } },
                labels: { include: { label: true } },
                _count: { select: { comments: true, attachments: true, checklistItems: true } },
            },
            orderBy: { order: 'asc' },
        });
        return { columns, tasks };
    }
};
exports.ProjectRepository = ProjectRepository;
exports.ProjectRepository = ProjectRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectRepository);
//# sourceMappingURL=project.repository.js.map