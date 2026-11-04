"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const cors_config_1 = require("./config/cors.config");
const database_bootstrap_1 = require("./config/database.bootstrap");
async function bootstrap() {
    await (0, database_bootstrap_1.resolveDatabaseConnection)();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logger = new common_1.Logger('Bootstrap');
    app.enableCors(cors_config_1.corsConfig);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.setGlobalPrefix('api');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Kanban Pro API')
        .setDescription('API do sistema de gerenciamento de projetos Kanban Pro')
        .setVersion('1.0.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    const port = process.env.PORT ?? 3002;
    await app.listen(port, '0.0.0.0');
    logger.log(`Aplicacao rodando em http://localhost:${port}/api`);
}
if (require.main === module) {
    bootstrap();
}
let cachedApp = null;
async function handler(req, res) {
    try {
        if (!cachedApp) {
            await (0, database_bootstrap_1.resolveDatabaseConnection)();
            const app = await core_1.NestFactory.create(app_module_1.AppModule, {
                logger: ['error', 'warn', 'log'],
            });
            app.enableCors(cors_config_1.corsConfig);
            app.useGlobalPipes(new common_1.ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
                transform: true,
            }));
            app.setGlobalPrefix('api');
            await app.init();
            cachedApp = app;
            console.log('NestJS app initialized for Vercel');
        }
        const httpAdapter = cachedApp.getHttpAdapter();
        const instance = httpAdapter.getInstance();
        instance(req, res);
    }
    catch (error) {
        console.error('Vercel handler error:', error instanceof Error ? error.message : 'Error');
        res.status(500).json({
            statusCode: 500,
            message: error instanceof Error ? error.message : 'Error',
        });
    }
}
//# sourceMappingURL=main.js.map