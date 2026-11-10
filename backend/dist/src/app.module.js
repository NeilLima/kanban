var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
import CorsConfig from './config/cors.config.js';
import DatabaseConfig from './config/database.config.js';
import JwtConfig from './config/jwt.config.js';
import AuthConfig from './config/auth.config.js';
import UploadsConfig from './config/uploads.config.js';
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
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
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map