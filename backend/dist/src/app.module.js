var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
import CorsConfig from './config/cors.config';
import DatabaseConfig from './config/database.config';
import JwtConfig from './config/jwt.config';
import AuthConfig from './config/auth.config';
import UploadsConfig from './config/uploads.config';
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
        ],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map