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
let ColumnRepository = class ColumnRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(userId) {
        return this.prisma.column.findMany({
            where: { project: { ownerId: userId } },
            include: { project: true },
            orderBy: { order: 'asc' },
        });
    }
    async findById(id) {
        return this.prisma.column.findUnique({
            where: { id },
            include: { project: true },
        });
    }
    async create(projectId, data) {
        const last = await this.prisma.column.findFirst({
            where: { projectId },
            orderBy: { order: 'desc' },
        });
        return this.prisma.column.create({
            data: {
                name: data.name,
                color: data.color ?? '#3b82f6',
                projectId,
                order: (last?.order ?? -1) + 1,
            },
        });
    }
    async update(id, data) {
        return this.prisma.column.update({ where: { id }, data });
    }
    async delete(id) {
        return this.prisma.column.delete({ where: { id } });
    }
};
ColumnRepository = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ColumnRepository);
export { ColumnRepository };
//# sourceMappingURL=column.repository.js.map