"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const label_controller_1 = require("./controllers/label.controller");
const label_service_1 = require("./services/label.service");
const label_repository_1 = require("./repository/label.repository");
let LabelModule = class LabelModule {
};
exports.LabelModule = LabelModule;
exports.LabelModule = LabelModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.registerAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    secret: config.get('jwt.secret'),
                }),
            }),
        ],
        controllers: [label_controller_1.LabelController],
        providers: [label_service_1.LabelService, label_repository_1.LabelRepository],
        exports: [label_service_1.LabelService, label_repository_1.LabelRepository],
    })
], LabelModule);
//# sourceMappingURL=label.module.js.map