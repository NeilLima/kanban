/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service.js';

@Injectable()
export class LabelRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.label.findMany({
      where: { project: { ownerId: userId } },
      include: { project: true },
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: string) {
    return this.prisma.label.findUnique({
      where: { id },
      include: { project: true },
    });
  }

  async create(data: { name: string; color?: string; projectId: string }) {
    return this.prisma.label.create({
      data: {
        name: data.name,
        color: data.color ?? '#6366f1',
        projectId: data.projectId,
      },
    });
  }

  async update(id: string, data: Record<string, unknown>) {
    return this.prisma.label.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.label.delete({ where: { id } });
  }
}