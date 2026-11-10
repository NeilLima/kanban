var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var TeamService_1;
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { TeamRepository } from '../repository/team.repository.js';
const PALETA = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ec4899', '#06b6d4', '#ef4444'];
const ORDEM_PAPEL = { VIEWER: 1, MEMBER: 2, ADMIN: 3, OWNER: 4 };
const ROTULO_PAPEL = {
    OWNER: 'Owner',
    ADMIN: 'Admin',
    MEMBER: 'Membro',
    VIEWER: 'Viewer',
};
const ROTULO_STATUS = {
    TODO: 'A Fazer',
    IN_PROGRESS: 'Em Desenvolvimento',
    REVIEW: 'Em Revisão',
    DONE: 'Concluído',
};
const ROTULO_PRIORIDADE = {
    URGENT: 'Urgente',
    HIGH: 'Alta',
    MEDIUM: 'Média',
    LOW: 'Baixa',
};
function nomeDe(user) {
    if (!user)
        return 'Usuário';
    return ([user.profile?.firstName, user.profile?.lastName].filter(Boolean).join(' ') ||
        user.email ||
        'Usuário');
}
let TeamService = TeamService_1 = class TeamService {
    repository;
    logger = new Logger(TeamService_1.name);
    constructor(repository) {
        this.repository = repository;
    }
    async getMembers(userId) {
        const [projects, tasks] = await Promise.all([
            this.repository.getVisibleProjects(userId),
            this.repository.getVisibleTasks(userId),
        ]);
        const membros = new Map();
        const ensure = (id, email, avatar, name) => {
            let m = membros.get(id);
            if (!m) {
                m = {
                    id,
                    name,
                    email,
                    avatar,
                    papelNivel: 0,
                    roles: new Set(),
                    projectIds: new Set(),
                };
                membros.set(id, m);
            }
            return m;
        };
        const bumpRole = (m, role, projectId) => {
            m.roles.add(role);
            m.projectIds.add(projectId);
            const nivel = ORDEM_PAPEL[role] ?? 0;
            if (nivel > m.papelNivel)
                m.papelNivel = nivel;
        };
        for (const p of projects) {
            const owner = ensure(p.owner.id, p.owner.email, p.owner.avatar, nomeDe(p.owner));
            bumpRole(owner, 'OWNER', p.id);
            for (const mem of p.members) {
                const m = ensure(mem.user.id, mem.user.email, mem.user.avatar, nomeDe(mem.user));
                bumpRole(m, mem.role, p.id);
            }
        }
        const stats = new Map();
        const bump = (uid, done) => {
            if (!uid)
                return;
            const s = stats.get(uid) ?? { total: 0, done: 0 };
            s.total += 1;
            if (done)
                s.done += 1;
            stats.set(uid, s);
        };
        for (const t of tasks) {
            const done = t.status === 'DONE';
            for (const a of t.assignees)
                bump(a.userId, done);
            bump(t.creatorId, done);
        }
        const team = [...membros.values()].map((m, indice) => {
            const s = stats.get(m.id) ?? { total: 0, done: 0 };
            const papel = [...m.roles].sort((a, b) => (ORDEM_PAPEL[b] ?? 0) - (ORDEM_PAPEL[a] ?? 0))[0];
            return {
                id: m.id,
                name: m.name,
                email: m.email,
                avatar: m.avatar,
                role: ROTULO_PAPEL[papel] ?? 'Membro',
                roleKey: papel ?? 'MEMBER',
                projectsCount: m.projectIds.size,
                tasks: s.total,
                done: s.done,
                productivity: s.total > 0 ? Math.round((s.done / s.total) * 100) : 0,
                color: PALETA[indice % PALETA.length],
            };
        });
        team.sort((a, b) => {
            const ra = ORDEM_PAPEL[a.roleKey] ?? 0;
            const rb = ORDEM_PAPEL[b.roleKey] ?? 0;
            if (ra !== rb)
                return rb - ra;
            return b.tasks - a.tasks;
        });
        return team;
    }
    async getMemberDetail(userId, memberId) {
        const [projects, tasks] = await Promise.all([
            this.repository.getMemberProjects(userId, memberId),
            this.repository.getMemberTasks(userId, memberId),
        ]);
        if (projects.length === 0) {
            throw new NotFoundException('Membro não encontrado na sua equipe');
        }
        const involved = tasks.filter((t) => t.assignees.some((a) => a.userId === memberId) || t.creatorId === memberId);
        const byStatus = {};
        let done = 0;
        let spentMinutes = 0;
        let overdue = 0;
        const agora = Date.now();
        for (const t of involved) {
            const label = ROTULO_STATUS[t.status] ?? t.status;
            byStatus[label] = (byStatus[label] ?? 0) + 1;
            if (t.status === 'DONE')
                done += 1;
            spentMinutes += t.spentTime ?? 0;
            if (t.status !== 'DONE' && t.dueDate && new Date(t.dueDate).getTime() < agora)
                overdue += 1;
        }
        const recentTasks = involved
            .slice()
            .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
            .slice(0, 10)
            .map((t) => ({
            id: t.id,
            title: t.title,
            status: ROTULO_STATUS[t.status] ?? t.status,
            priority: ROTULO_PRIORIDADE[t.priority] ?? t.priority,
            dueDate: t.dueDate,
            project: t.project,
        }));
        const papel = projects
            .map((p) => p.role)
            .sort((a, b) => (ORDEM_PAPEL[b] ?? 0) - (ORDEM_PAPEL[a] ?? 0))[0];
        const firstProject = projects[0];
        const memberUser = await this.repository.getMemberUser(memberId);
        if (!memberUser)
            throw new NotFoundException('Usuário não encontrado');
        return {
            id: memberUser.id,
            name: nomeDe(memberUser),
            email: memberUser.email,
            avatar: memberUser.avatar,
            role: ROTULO_PAPEL[papel] ?? 'Membro',
            color: firstProject?.color ?? '#3b82f6',
            projects,
            stats: {
                total: involved.length,
                done,
                productivity: involved.length > 0 ? Math.round((done / involved.length) * 100) : 0,
                overdue,
                spentHours: Math.round(spentMinutes / 60),
                byStatus,
            },
            recentTasks,
        };
    }
};
TeamService = TeamService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [TeamRepository])
], TeamService);
export { TeamService };
//# sourceMappingURL=team.service.js.map