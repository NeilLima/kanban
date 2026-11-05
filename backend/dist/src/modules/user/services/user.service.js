var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var UserService_1;
import { Injectable, Logger, NotFoundException, ForbiddenException } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
let UserService = UserService_1 = class UserService {
    userRepository;
    logger = new Logger(UserService_1.name);
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    create(userId, dto) {
        this.logger.log(`Criando usuário "${dto.email}"`);
        return this.userRepository.create({ ...dto, createdBy: userId });
    }
    findAll(userId) {
        return this.userRepository.findAll(userId);
    }
    async findOne(id, userId) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }
        return user;
    }
    async update(id, userId, dto) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }
        if (user.id !== userId) {
            throw new ForbiddenException('Você só pode editar seu próprio perfil');
        }
        return this.userRepository.update(id, { ...dto });
    }
    async remove(id, userId) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }
        if (user.id !== userId) {
            throw new ForbiddenException('Você só pode excluir seu próprio perfil');
        }
        return this.userRepository.delete(id);
    }
    async getProfile(id, userId) {
        const profile = await this.userRepository.getProfile(id);
        if (!profile) {
            throw new NotFoundException('Perfil não encontrado');
        }
        return profile;
    }
    async updateAvatar(id, userId, avatarUrl) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }
        if (user.id !== userId) {
            throw new ForbiddenException('Você só pode atualizar seu próprio avatar');
        }
        return this.userRepository.updateAvatar(id, avatarUrl);
    }
};
UserService = UserService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [UserRepository])
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map