/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { LabelRepository } from '../repository/label.repository';
import { CreateLabelDto, UpdateLabelDto } from '../dto/label.dto';

@Injectable()
export class LabelService {
  private readonly logger = new Logger(LabelService.name);

  constructor(private readonly labelRepository: LabelRepository) {}

  create(userId: string, dto: CreateLabelDto) {
    this.logger.log(`Criando label "${dto.name}"`);
    return this.labelRepository.create(dto);
  }

  findAll(userId: string) {
    return this.labelRepository.findAll(userId);
  }

  async findOne(id: string, userId: string) {
    const label = await this.labelRepository.findById(id);
    if (!label) {
      throw new NotFoundException('Label não encontrada');
    }
    return label;
  }

  async update(id: string, userId: string, dto: UpdateLabelDto) {
    const label = await this.labelRepository.findById(id);
    if (!label) {
      throw new NotFoundException('Label não encontrada');
    }
    return this.labelRepository.update(id, { ...dto });
  }

  async remove(id: string, userId: string) {
    const label = await this.labelRepository.findById(id);
    if (!label) {
      throw new NotFoundException('Label não encontrada');
    }
    return this.labelRepository.delete(id);
  }
}