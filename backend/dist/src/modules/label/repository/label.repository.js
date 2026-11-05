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
let LabelRepository = class LabelRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(userId) {
        return this.prisma.label.findMany({
            where: { project: { ownerId: userId } },
            include: { project: true },
            orderBy: { name: 'asc' },
        });
    }
    async findById(id) {
        return this.prisma.label.findUnique({
            where: { id },
            include: { project: true },
        });
    }
    async create(data) {
        return this.prisma.label.create({
            data: {
                name: data.name,
                color: data.color ?? '#6366f1',
                projectId: data.projectId,
            },
        });
    }
    async update(id, data) {
        return this.prisma.label.update({ where: { id }, data });
    }
    async delete(id) {
        return this.prisma.label.delete({ where: { id } });
    }
};
LabelRepository = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], LabelRepository);
export { LabelRepository };
//# sourceMappingURL=label.repository.js.map