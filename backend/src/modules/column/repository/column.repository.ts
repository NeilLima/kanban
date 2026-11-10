/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service.js';

@Injectable()
export class ColumnRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.column.findMany({
      where: { project: { ownerId: userId } },
      include: { project: true },
      orderBy: { order: 'asc' },
    });
  }

  async findById(id: string) {
    return this.prisma.column.findUnique({
      where: { id },
      include: { project: true },
    });
  }

  async create(projectId: string, data: { name: string; color?: string }) {
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

  async update(id: string, data: Record<string, unknown>) {
    return this.prisma.column.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.column.delete({ where: { id } });
  }
}