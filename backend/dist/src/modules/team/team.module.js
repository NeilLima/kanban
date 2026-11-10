var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TeamController } from './controllers/team.controller.js';
import { TeamService } from './services/team.service.js';
import { TeamRepository } from './repository/team.repository.js';
let TeamModule = class TeamModule {
};
TeamModule = __decorate([
    Module({
        imports: [
            JwtModule.registerAsync({
                inject: [ConfigService],
                useFactory: (config) => ({
                    secret: config.get('jwt.secret'),
                }),
            }),
        ],
        controllers: [TeamController],
        providers: [TeamService, TeamRepository],
        exports: [TeamService],
    })
], TeamModule);
export { TeamModule };
//# sourceMappingURL=team.module.js.map