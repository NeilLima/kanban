/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './modules/project/project.module';
import { TaskModule } from './modules/task/task.module';
import { ReportModule } from './modules/report/report.module';
import { UserModule } from './modules/user/user.module';
import { NotificationModule } from './modules/notification/notification.module';
import { ColumnModule } from './modules/column/column.module';
import { LabelModule } from './modules/label/label.module';

// Configurações centralizadas (ver DOCUMENTACAO_GERAL.md)
import CorsConfig from './config/cors.config';
import DatabaseConfig from './config/database.config';
import JwtConfig from './config/jwt.config';
import AuthConfig from './config/auth.config';
import UploadsConfig from './config/uploads.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'production' ? undefined : '.env',
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
  ],
})
export class AppModule {}

