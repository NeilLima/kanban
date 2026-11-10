var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service.js';
const PROJECT_SCOPE = (userId) => ({
    OR: [{ ownerId: userId }, { members: { some: { userId } } }],
});
let TeamRepository = class TeamRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getVisibleProjects(userId) {
        return this.prisma.project.findMany({
            where: PROJECT_SCOPE(userId),
            select: {
                id: true,
                name: true,
                color: true,
                ownerId: true,
                owner: {
                    select: {
                        id: true,
                        email: true,
                        avatar: true,
                        profile: { select: { firstName: true, lastName: true } },
                    },
                },
                members: {
                    select: {
                        userId: true,
                        role: true,
                        user: {
                            select: {
                                id: true,
                                email: true,
                                avatar: true,
                                profile: { select: { firstName: true, lastName: true } },
                            },
                        },
                    },
                },
            },
        });
    }
    async getVisibleTasks(userId) {
        return this.prisma.task.findMany({
            where: { project: PROJECT_SCOPE(userId) },
            select: {
                id: true,
                title: true,
                status: true,
                priority: true,
                dueDate: true,
                spentTime: true,
                updatedAt: true,
                creatorId: true,
                projectId: true,
                project: { select: { id: true, name: true, color: true } },
                assignees: { select: { userId: true } },
            },
        });
    }
    async getMemberProjects(userId, memberId) {
        const projects = await this.prisma.project.findMany({
            where: {
                AND: [
                    PROJECT_SCOPE(userId),
                    {
                        OR: [
                            { ownerId: memberId },
                            { members: { some: { userId: memberId } } },
                        ],
                    },
                ],
            },
            select: {
                id: true,
                name: true,
                color: true,
                ownerId: true,
                members: {
                    where: { userId: memberId },
                    select: { role: true },
                },
            },
        });
        return projects.map((p) => ({
            id: p.id,
            name: p.name,
            color: p.color,
            isOwner: p.ownerId === memberId,
            role: p.members[0]?.role ?? (p.ownerId === memberId ? 'OWNER' : 'MEMBER'),
        }));
    }
    async getMemberUser(memberId) {
        return this.prisma.user.findUnique({
            where: { id: memberId },
            select: {
                id: true,
                email: true,
                avatar: true,
                profile: { select: { firstName: true, lastName: true } },
            },
        });
    }
    async getMemberTasks(userId, memberId) {
        return this.prisma.task.findMany({
            where: {
                project: {
                    AND: [
                        PROJECT_SCOPE(userId),
                        {
                            OR: [
                                { ownerId: memberId },
                                { members: { some: { userId: memberId } } },
                            ],
                        },
                    ],
                },
            },
            select: {
                id: true,
                title: true,
                status: true,
                priority: true,
                dueDate: true,
                spentTime: true,
                updatedAt: true,
                creatorId: true,
                project: { select: { id: true, name: true, color: true } },
                assignees: { select: { userId: true } },
            },
        });
    }
};
TeamRepository = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], TeamRepository);
export { TeamRepository };
//# sourceMappingURL=team.repository.js.map