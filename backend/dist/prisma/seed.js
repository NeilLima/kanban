"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Executando seed...');
    const password = await bcrypt.hash('senha12345', 10);
    const user = await prisma.user.upsert({
        where: { email: 'demo@kanban.com' },
        update: {},
        create: {
            email: 'demo@kanban.com',
            password,
            username: 'demo',
            profile: {
                create: { firstName: 'Victor', lastName: 'Lima' },
            },
        },
    });
    const existingProject = await prisma.project.findFirst({
        where: { ownerId: user.id },
    });
    if (!existingProject) {
        await prisma.project.create({
            data: {
                name: 'Plataforma Nexus',
                description: 'Sistema completo de gerenciamento de projetos com Kanban intuitivo e colaborativo.',
                status: 'ACTIVE',
                color: '#3b82f6',
                icon: '🚀',
                ownerId: user.id,
                members: { create: { userId: user.id, role: 'OWNER' } },
                columns: {
                    create: [
                        { name: 'A Fazer', color: '#3b82f6', order: 0 },
                        { name: 'Em Desenvolvimento', color: '#f59e0b', order: 1 },
                        { name: 'Em Revisão', color: '#8b5cf6', order: 2 },
                        { name: 'Concluído', color: '#10b981', order: 3 },
                    ],
                },
            },
        });
        console.log('✅ Projeto demo criado');
    }
    console.log('✅ Seed concluído. Login: demo@kanban.com / senha12345');
}
main()
    .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
})
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=seed.js.map