/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger, NotFoundException, ForbiddenException } from '@nestjs/common';

import { ColumnRepository } from '../repository/column.repository';
import { CreateColumnDto, UpdateColumnDto } from '../dto/column.dto';

@Injectable()
export class ColumnService {
  private readonly logger = new Logger(ColumnService.name);

  constructor(private readonly columnRepository: ColumnRepository) {}

  create(userId: string, dto: CreateColumnDto) {
    this.logger.log(`Criando coluna "${dto.name}"`);
    return this.columnRepository.create(dto.projectId, dto);
  }

  findAll(userId: string) {
    return this.columnRepository.findAll(userId);
  }

  async findOne(id: string, userId: string) {
    const column = await this.columnRepository.findById(id);
    if (!column) {
      throw new NotFoundException('Coluna não encontrada');
    }
    return column;
  }

  async update(id: string, userId: string, dto: UpdateColumnDto) {
    const column = await this.columnRepository.findById(id);
    if (!column) {
      throw new NotFoundException('Coluna não encontrada');
    }
    return this.columnRepository.update(id, { ...dto });
  }

  async remove(id: string, userId: string) {
    const column = await this.columnRepository.findById(id);
    if (!column) {
      throw new NotFoundException('Coluna não encontrada');
    }
    return this.columnRepository.delete(id);
  }
}