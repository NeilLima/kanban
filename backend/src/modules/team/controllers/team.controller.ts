/* eslint-disable prettier/prettier */
import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { TeamService } from '../services/team.service.js';
import { AuthGuard } from '../../../common/guards/auth.guard.js';
import { GetUser } from '../../../common/decorators/get-user.decorator.js';

@Controller('team')
@UseGuards(AuthGuard)
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  /** Membros da equipe (projetos compartilhados) com estatísticas */
  @Get('members')
  getMembers(@GetUser('userId') userId: string) {
    return this.teamService.getMembers(userId);
  }

  /** Detalhe de um membro: projetos, estatísticas e tarefas recentes */
  @Get('members/:userId')
  getMemberDetail(@GetUser('userId') userId: string, @Param('userId') memberId: string) {
    return this.teamService.getMemberDetail(userId, memberId);
  }
}
