"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const column_controller_1 = require("./controllers/column.controller");
const column_service_1 = require("./services/column.service");
const column_repository_1 = require("./repository/column.repository");
let ColumnModule = class ColumnModule {
};
exports.ColumnModule = ColumnModule;
exports.ColumnModule = ColumnModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.registerAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    secret: config.get('jwt.secret'),
                }),
            }),
        ],
        controllers: [column_controller_1.ColumnController],
        providers: [column_service_1.ColumnService, column_repository_1.ColumnRepository],
        exports: [column_service_1.ColumnService, column_repository_1.ColumnRepository],
    })
], ColumnModule);
//# sourceMappingURL=column.module.js.map