import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
const prisma = new PrismaClient();
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