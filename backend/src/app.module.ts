/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CoreModule } from './core/core.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ProjectModule } from './modules/project/project.module.js';
import { TaskModule } from './modules/task/task.module.js';
import { ReportModule } from './modules/report/report.module.js';
import { UserModule } from './modules/user/user.module.js';
import { NotificationModule } from './modules/notification/notification.module.js';
import { ColumnModule } from './modules/column/column.module.js';
import { LabelModule } from './modules/label/label.module.js';
import { TeamModule } from './modules/team/team.module.js';

// Configurações centralizadas (ver DOCUMENTACAO_GERAL.md)
import CorsConfig from './config/cors.config.js';
import DatabaseConfig from './config/database.config.js';
import JwtConfig from './config/jwt.config.js';
import AuthConfig from './config/auth.config.js';
import UploadsConfig from './config/uploads.config.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [CorsConfig, DatabaseConfig, JwtConfig, AuthConfig, UploadsConfig],
    }),
    CoreModule,
    AuthModule,
    ProjectModule,
    TaskModule,
    ReportModule,
    UserModule,
    NotificationModule,
    ColumnModule,
    LabelModule,
    TeamModule,
  ],
})
export class AppModule {}

