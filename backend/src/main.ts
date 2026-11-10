/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module.js';
import { corsConfig } from './config/cors.config.js';
import { resolveDatabaseConnection } from './config/database.bootstrap.js';

async function bootstrap() {
  await resolveDatabaseConnection();
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.enableCors(corsConfig);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Kanban Pro API')
    .setDescription('API do sistema de gerenciamento de projetos Kanban Pro')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT ?? 3002;
  await app.listen(port, '0.0.0.0');
  logger.log(`Aplicacao rodando em http://localhost:${port}/api`);
}

const isMain = process.argv[1] && /main(\.js)?$/.test(process.argv[1]);
if (isMain) {
  bootstrap();
}

let cachedApp: unknown = null;

export default async function handler(req: unknown, res: unknown) {
  try {
    if (!cachedApp) {
      await resolveDatabaseConnection();
      const app = await NestFactory.create(AppModule, {
        logger: ['error', 'warn', 'log'],
      });
      app.enableCors(corsConfig);
      app.useGlobalPipes(
        new ValidationPipe({
          whitelist: true,
          forbidNonWhitelisted: true,
          transform: true,
        }),
      );
      app.setGlobalPrefix('api');
      await app.init();
      cachedApp = app;
      console.log('NestJS app initialized for Vercel');
    }
    const httpAdapter = (cachedApp as { getHttpAdapter(): { getInstance(): unknown } }).getHttpAdapter();
    const instance = httpAdapter.getInstance() as (req: unknown, res: unknown) => void;
    instance(req, res);
  } catch (error) {
    console.error(
      'Vercel handler error:',
      error instanceof Error ? error.message : 'Error',
    );
    (res as { status(code: number): { json(body: unknown): void } }).status(500).json({
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Error',
    });
  }
}