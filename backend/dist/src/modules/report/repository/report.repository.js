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
import { PrismaService } from '../../../core/prisma/prisma.service';
let ReportRepository = class ReportRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUserTasks(userId) {
        return this.prisma.task.findMany({
            where: {
                project: {
                    OR: [{ ownerId: userId }, { members: { some: { userId } } }],
                },
            },
            select: {
                id: true,
                title: true,
                status: true,
                priority: true,
                spentTime: true,
                dueDate: true,
                createdAt: true,
                updatedAt: true,
                project: { select: { id: true, name: true, color: true } },
                assignees: { select: { userId: true } },
            },
        });
    }
    async getUserMembers(userId) {
        return this.prisma.projectMember.findMany({
            where: {
                project: {
                    OR: [{ ownerId: userId }, { members: { some: { userId } } }],
                },
            },
            select: {
                userId: true,
                role: true,
                user: {
                    select: {
                        email: true,
                        profile: { select: { firstName: true, lastName: true } }
                    },
                },
            },
        });
    }
    async getRecentActivity(userId) {
        return this.prisma.taskHistory.findMany({
            where: {
                task: {
                    project: {
                        OR: [{ ownerId: userId }, { members: { some: { userId } } }],
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
            take: 8,
            include: {
                task: { select: { title: true } },
                user: { select: { email: true, profile: { select: { firstName: true, lastName: true } } } },
            },
        });
    }
};
ReportRepository = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ReportRepository);
export { ReportRepository };
//# sourceMappingURL=report.repository.js.map