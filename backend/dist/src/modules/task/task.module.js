"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const task_controller_1 = require("./controllers/task.controller");
const task_service_1 = require("./services/task.service");
const task_repository_1 = require("./repository/task.repository");
const project_repository_1 = require("../project/repository/project.repository");
let TaskModule = class TaskModule {
};
exports.TaskModule = TaskModule;
exports.TaskModule = TaskModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.registerAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    secret: config.get('jwt.secret'),
                }),
            }),
        ],
        controllers: [task_controller_1.TaskController],
        providers: [task_service_1.TaskService, task_repository_1.TaskRepository, project_repository_1.ProjectRepository],
        exports: [task_service_1.TaskService],
    })
], TaskModule);
//# sourceMappingURL=task.module.js.map