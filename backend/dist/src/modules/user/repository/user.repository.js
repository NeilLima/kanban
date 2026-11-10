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
const USER_INCLUDE = {
    profile: true,
    projectMembers: { include: { project: true } },
    assignedTasks: { include: { task: true } },
    notifications: { where: { isRead: false }, orderBy: { createdAt: 'desc' } },
};
let UserRepository = class UserRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.user.create({
            data: {
                email: data.email,
                username: data.username,
                password: data.password,
                avatar: data.avatar,
                role: data.role ?? 'member',
            },
            include: USER_INCLUDE,
        });
    }
    async findAll(currentUserId) {
        return this.prisma.user.findMany({
            where: { id: { not: currentUserId } },
            include: { profile: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findById(id) {
        return this.prisma.user.findUnique({
            where: { id },
            include: USER_INCLUDE,
        });
    }
    async update(id, data) {
        return this.prisma.user.update({
            where: { id },
            data,
            include: USER_INCLUDE,
        });
    }
    async delete(id) {
        return this.prisma.user.delete({ where: { id } });
    }
    async getProfile(id) {
        return this.prisma.profile.findUnique({
            where: { userId: id },
            include: { user: true },
        });
    }
    async updateAvatar(id, avatarUrl) {
        return this.prisma.user.update({
            where: { id },
            data: { avatar: avatarUrl },
            include: USER_INCLUDE,
        });
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
            include: { profile: true },
        });
    }
};
UserRepository = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], UserRepository);
export { UserRepository };
//# sourceMappingURL=user.repository.js.map