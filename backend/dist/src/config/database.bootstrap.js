import * as path from 'path';
import * as fs from 'fs';
import { parse as dotenvParse } from 'dotenv';
import { PrismaClient } from '@prisma/client';
export async function resolveDatabaseConnection() {
    const cwd = process.cwd();
    const readEnv = (file) => {
        const fullPath = path.join(cwd, file);
        if (!fs.existsSync(fullPath))
            return {};
        try {
            return dotenvParse(fs.readFileSync(fullPath, 'utf8'));
        }
        catch {
            return {};
        }
    };
    const prodEnv = readEnv('.env');
    const localEnv = readEnv('.env.local');
    const prodUrl = prodEnv.DATABASE_URL || process.env.DATABASE_URL || '';
    const defaultLocalUrl = localEnv.DATABASE_URL || prodUrl || process.env.DATABASE_URL || '';
    const localUrl = /(localhost|127\.0\.0\.1)/i.test(defaultLocalUrl) ? defaultLocalUrl : (localEnv.DATABASE_URL || '');
    const inProduction = process.env.NODE_ENV === 'production';
    if (inProduction && prodUrl) {
        process.env.DATABASE_URL = prodUrl;
        process.env.DIRECT_URL = prodEnv.DIRECT_URL || prodUrl;
        return summarize(prodUrl, false, 'production');
    }
    const chosen = await testAndPick(localUrl, prodUrl);
    process.env.DATABASE_URL = chosen.url;
    process.env.DIRECT_URL = chosen.url;
    return summarize(chosen.url, chosen.isLocal, chosen.isLocal ? 'local' : 'production');
}
async function testAndPick(localUrl, prodUrl) {
    if (localUrl) {
        const ok = await canConnect(localUrl);
        if (ok) {
            console.log('\nBanco LOCAL disponivel');
            return { url: localUrl, isLocal: true };
        }
        console.warn('\nNao foi possivel conectar no banco LOCAL. Usando PRODUCAO.\n');
    }
    return { url: prodUrl || localUrl, isLocal: false };
}
async function canConnect(url) {
    const prisma = new PrismaClient({ datasources: { db: { url } } });
    try {
        await prisma.$queryRaw `SELECT 1`;
        return true;
    }
    catch {
        return false;
    }
    finally {
        await prisma.$disconnect().catch(() => undefined);
    }
}
function summarize(url, isLocal, connectedTo) {
    const withoutQuery = url.split('?')[0];
    const parts = withoutQuery.split('/');
    const dbName = parts[parts.length - 1] || 'unknown';
    const hostMatch = url.match(/@([^:/]+)/);
    const host = hostMatch ? hostMatch[1] : 'unknown';
    if (!isLocal)
        console.log('Conexao definida para PRODUCAO (banco remoto).');
    console.log('Verificando conexao com banco de dados...');
    console.log('   Banco: ' + dbName);
    console.log('   Host: ' + host);
    console.log(connectedTo === 'local' ? '   Status: Conectado ao banco LOCAL' : '   Status: Conectado ao banco de PRODUCAO (fallback)');
    return { database: dbName, host, isLocal, connectedTo };
}
//# sourceMappingURL=database.bootstrap.js.map