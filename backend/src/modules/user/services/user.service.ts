/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable, Logger, NotFoundException, ForbiddenException } from '@nestjs/common';

import { UserRepository } from '../repository/user.repository';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) {}

  create(userId: string, dto: CreateUserDto) {
    this.logger.log(`Criando usuário "${dto.email}"`);
    return this.userRepository.create({ ...dto, createdBy: userId });
  }

  findAll(userId: string) {
    return this.userRepository.findAll(userId);
  }

  async findOne(id: string, userId: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  async update(id: string, userId: string, dto: UpdateUserDto) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    if (user.id !== userId) {
      throw new ForbiddenException('Você só pode editar seu próprio perfil');
    }
    return this.userRepository.update(id, { ...dto });
  }

  async remove(id: string, userId: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    if (user.id !== userId) {
      throw new ForbiddenException('Você só pode excluir seu próprio perfil');
    }
    return this.userRepository.delete(id);
  }

  async getProfile(id: string, userId: string) {
    const profile = await this.userRepository.getProfile(id);
    if (!profile) {
      throw new NotFoundException('Perfil não encontrado');
    }
    return profile;
  }

  async updateAvatar(id: string, userId: string, avatarUrl: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    if (user.id !== userId) {
      throw new ForbiddenException('Você só pode atualizar seu próprio avatar');
    }
    return this.userRepository.updateAvatar(id, avatarUrl);
  }
}