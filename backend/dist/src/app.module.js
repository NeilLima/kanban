"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_module_1 = require("./core/core.module");
const auth_module_1 = require("./auth/auth.module");
const project_module_1 = require("./modules/project/project.module");
const task_module_1 = require("./modules/task/task.module");
const report_module_1 = require("./modules/report/report.module");
const user_module_1 = require("./modules/user/user.module");
const notification_module_1 = require("./modules/notification/notification.module");
const column_module_1 = require("./modules/column/column.module");
const label_module_1 = require("./modules/label/label.module");
const cors_config_1 = __importDefault(require("./config/cors.config"));
const database_config_1 = __importDefault(require("./config/database.config"));
const jwt_config_1 = __importDefault(require("./config/jwt.config"));
const auth_config_1 = __importDefault(require("./config/auth.config"));
const uploads_config_1 = __importDefault(require("./config/uploads.config"));
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ['.env'],
                load: [cors_config_1.default, database_config_1.default, jwt_config_1.default, auth_config_1.default, uploads_config_1.default],
            }),
            core_module_1.CoreModule,
            auth_module_1.AuthModule,
            project_module_1.ProjectModule,
            task_module_1.TaskModule,
            report_module_1.ReportModule,
            user_module_1.UserModule,
            notification_module_1.NotificationModule,
            column_module_1.ColumnModule,
            label_module_1.LabelModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map