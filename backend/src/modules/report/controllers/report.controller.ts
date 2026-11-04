/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards } from '@nestjs/common';

import { ReportService } from '../services/report.service';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { GetUser } from '../../../common/decorators/get-user.decorator';

@Controller('reports')
@UseGuards(AuthGuard)
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  /** Visão agregada para a página de relatórios (KPIs, produtividade, distribuição, tempo, equipe) */
  @Get('overview')
  getOverview(@GetUser('userId') userId: string) {
    return this.reportService.getOverview(userId);
  }
}
