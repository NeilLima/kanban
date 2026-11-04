"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const report_repository_1 = require("../repository/report.repository");
const DIA_MS = 86_400_000;
const JANELA_DIAS = 7;
const SEMANAS = 7;
const STATUS_META = {
    TODO: { name: 'A Fazer', color: '#3b82f6' },
    IN_PROGRESS: { name: 'Em Desenvolvimento', color: '#f59e0b' },
    REVIEW: { name: 'Em Revisão', color: '#8b5cf6' },
    DONE: { name: 'Concluído', color: '#10b981' },
};
const PALETA = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ec4899', '#06b6d4', '#ef4444'];
const ORDEM_PAPEL = { VIEWER: 1, MEMBER: 2, ADMIN: 3, OWNER: 4 };
const ROTULO_PAPEL = {
    OWNER: 'Owner',
    ADMIN: 'Admin',
    MEMBER: 'Membro',
    VIEWER: 'Viewer',
};
const ROTULO_PRIORIDADE = {
    URGENT: 'Urgente',
    HIGH: 'Alta',
    MEDIUM: 'Média',
    LOW: 'Baixa',
};
function percentual(atual, anterior) {
    if (anterior <= 0)
        return atual > 0 ? '100%' : '0%';
    const delta = Math.round(((atual - anterior) / anterior) * 100);
    return `${Math.abs(delta)}%`;
}
function direcao(atual, anterior) {
    if (atual === anterior)
        return 'up';
    return atual > anterior ? 'up' : 'down';
}
function inicioSemana(ms) {
    const d = new Date(ms);
    const dia = d.getDay();
    const diff = dia === 0 ? 6 : dia - 1;
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() - diff).getTime();
}
let ReportService = class ReportService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async getOverview(userId) {
        const [tasks, members, activityRaw] = await Promise.all([
            this.repository.getUserTasks(userId),
            this.repository.getUserMembers(userId),
            this.repository.getRecentActivity(userId),
        ]);
        const agora = Date.now();
        const total = tasks.length;
        const concluidas = tasks.filter((t) => t.status === 'DONE').length;
        const atrasadas = tasks.filter((t) => t.status !== 'DONE' && t.dueDate && new Date(t.dueDate).getTime() < agora).length;
        const horas = Math.round(tasks.reduce((soma, t) => soma + (t.spentTime ?? 0), 0) / 60);
        const produtividade = total > 0 ? Math.round((concluidas / total) * 100) : 0;
        const fim7 = agora - JANELA_DIAS * DIA_MS;
        const ini14 = fim7 - JANELA_DIAS * DIA_MS;
        const emJanela = (ms, ini, fim) => ms >= ini && ms < fim;
        const concluidas7 = tasks.filter((t) => t.status === 'DONE' && emJanela(new Date(t.updatedAt).getTime(), fim7, agora)).length;
        const concluidas14 = tasks.filter((t) => t.status === 'DONE' && emJanela(new Date(t.updatedAt).getTime(), ini14, fim7)).length;
        const horas7 = Math.round(tasks
            .filter((t) => emJanela(new Date(t.updatedAt).getTime(), fim7, agora))
            .reduce((soma, t) => soma + (t.spentTime ?? 0), 0) / 60);
        const horas14 = Math.round(tasks
            .filter((t) => emJanela(new Date(t.updatedAt).getTime(), ini14, fim7))
            .reduce((soma, t) => soma + (t.spentTime ?? 0), 0) / 60);
        const atualizadas7 = tasks.filter((t) => emJanela(new Date(t.updatedAt).getTime(), fim7, agora)).length;
        const atualizadas14 = tasks.filter((t) => emJanela(new Date(t.updatedAt).getTime(), ini14, fim7)).length;
        const prod7 = atualizadas7 > 0 ? Math.round((concluidas7 / atualizadas7) * 100) : 0;
        const prod14 = atualizadas14 > 0 ? Math.round((concluidas14 / atualizadas14) * 100) : 0;
        const atrasadas7 = tasks.filter((t) => {
            if (t.status === 'DONE' || !t.dueDate)
                return false;
            const venc = new Date(t.dueDate).getTime();
            return venc >= fim7 && venc < agora;
        }).length;
        const atrasadas14 = tasks.filter((t) => {
            if (t.status === 'DONE' || !t.dueDate)
                return false;
            const venc = new Date(t.dueDate).getTime();
            return venc >= ini14 && venc < fim7;
        }).length;
        const kpis = {
            done: {
                value: concluidas,
                percentage: percentual(concluidas7, concluidas14),
                trend: direcao(concluidas7, concluidas14),
            },
            hours: {
                value: horas,
                percentage: percentual(horas7, horas14),
                trend: direcao(horas7, horas14),
            },
            productivity: {
                value: produtividade,
                percentage: percentual(prod7, prod14),
                trend: direcao(prod7, prod14),
            },
            overdue: {
                value: atrasadas,
                percentage: percentual(atrasadas7, atrasadas14),
                trend: direcao(atrasadas7, atrasadas14),
            },
        };
        const semanaAtual = inicioSemana(agora);
        const productivity = [];
        for (let i = SEMANAS - 1; i >= 0; i--) {
            const ini = semanaAtual - i * 7 * DIA_MS;
            const fim = ini + 7 * DIA_MS;
            const criadasNaSemana = tasks.filter((t) => {
                const criada = new Date(t.createdAt).getTime();
                return criada >= ini && criada < fim;
            });
            productivity.push({
                label: `S${SEMANAS - i}`,
                concluidas: criadasNaSemana.filter((t) => t.status === 'DONE').length,
                pendentes: criadasNaSemana.filter((t) => t.status !== 'DONE').length,
                horas: Math.round(tasks
                    .filter((t) => {
                    const atualizada = new Date(t.updatedAt).getTime();
                    return atualizada >= ini && atualizada < fim;
                })
                    .reduce((soma, t) => soma + (t.spentTime ?? 0), 0) / 60),
                atrasadas: tasks.filter((t) => {
                    if (t.status === 'DONE' || !t.dueDate)
                        return false;
                    const venc = new Date(t.dueDate).getTime();
                    return venc >= ini && venc < fim && venc < agora;
                }).length,
            });
        }
        const contagemStatus = new Map();
        for (const t of tasks) {
            contagemStatus.set(t.status, (contagemStatus.get(t.status) ?? 0) + 1);
        }
        const distribution = Object.keys(STATUS_META).map((status) => ({
            name: STATUS_META[status].name,
            value: contagemStatus.get(status) ?? 0,
            color: STATUS_META[status].color,
        }));
        const porProjeto = new Map();
        for (const t of tasks) {
            const atual = porProjeto.get(t.project.id) ?? {
                project: t.project.name,
                tarefas: 0,
                minutos: 0,
                color: t.project.color,
            };
            atual.tarefas += 1;
            atual.minutos += t.spentTime ?? 0;
            porProjeto.set(t.project.id, atual);
        }
        const timeSpent = [...porProjeto.values()]
            .map((p) => ({
            project: p.project,
            tarefas: p.tarefas,
            horas: Math.round(p.minutos / 60),
            color: p.color,
        }))
            .sort((a, b) => b.horas - a.horas)
            .slice(0, 6);
        const membros = new Map();
        for (const m of members) {
            const nivel = ORDEM_PAPEL[m.role] ?? 2;
            const atual = membros.get(m.userId);
            if (!atual || nivel > atual.papelNivel) {
                const nome = [m.user.profile?.firstName, m.user.profile?.lastName].filter(Boolean).join(' ') ||
                    m.user.email;
                membros.set(m.userId, {
                    id: m.userId,
                    name: nome,
                    email: m.user.email,
                    role: ROTULO_PAPEL[m.role] ?? 'Membro',
                    papelNivel: nivel,
                    tarefas: atual?.tarefas ?? 0,
                    done: atual?.done ?? 0,
                });
            }
        }
        const atribuicoes = new Map();
        for (const t of tasks) {
            for (const a of t.assignees) {
                const atual = atribuicoes.get(a.userId) ?? { total: 0, done: 0 };
                atual.total += 1;
                if (t.status === 'DONE')
                    atual.done += 1;
                atribuicoes.set(a.userId, atual);
            }
        }
        for (const [autorId, stats] of atribuicoes) {
            const membro = membros.get(autorId);
            if (membro) {
                membro.tarefas = stats.total;
                membro.done = stats.done;
            }
        }
        const team = [...membros.values()].map((m, indice) => ({
            id: m.id,
            name: m.name,
            email: m.email,
            role: m.role,
            tarefas: m.tarefas,
            done: m.done,
            produtividade: m.tarefas > 0 ? Math.round((m.done / m.tarefas) * 100) : 0,
            color: PALETA[indice % PALETA.length],
        }));
        const upcoming = tasks
            .filter((t) => t.status !== 'DONE' && t.dueDate)
            .sort((a, b) => new Date(a.dueDate ?? 0).getTime() - new Date(b.dueDate ?? 0).getTime())
            .slice(0, 8)
            .map((t) => ({
            id: t.id,
            title: t.title,
            dueDate: t.dueDate,
            priority: ROTULO_PRIORIDADE[t.priority] ?? 'Média',
            category: t.project.name,
            color: t.project.color,
            status: STATUS_META[t.status]?.name ?? t.status,
        }));
        const calendar = tasks
            .filter((t) => t.dueDate)
            .map((t) => ({
            title: t.title,
            dueDate: t.dueDate,
            status: t.status,
            color: t.project.color,
        }));
        const activity = activityRaw.map((h) => ({
            id: h.id,
            action: `${h.field}: ${h.oldValue ?? '—'} → ${h.newValue ?? '—'}`,
            taskTitle: h.task.title,
            userName: h.user
                ? [h.user.profile?.firstName, h.user.profile?.lastName].filter(Boolean).join(' ') ||
                    h.user.email
                : 'Sistema',
            createdAt: h.createdAt,
        }));
        return { kpis, productivity, distribution, timeSpent, team, upcoming, calendar, activity };
    }
};
exports.ReportService = ReportService;
exports.ReportService = ReportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [report_repository_1.ReportRepository])
], ReportService);
//# sourceMappingURL=report.service.js.map