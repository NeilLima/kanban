var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserController } from './controllers/user.controller.js';
import { UserService } from './services/user.service.js';
import { UserRepository } from './repository/user.repository.js';
let UserModule = class UserModule {
};
UserModule = __decorate([
    Module({
        imports: [
            JwtModule.registerAsync({
                inject: [ConfigService],
                useFactory: (config) => ({
                    secret: config.get('jwt.secret'),
                }),
            }),
        ],
        controllers: [UserController],
        providers: [UserService, UserRepository],
        exports: [UserService, UserRepository],
    })
], UserModule);
export { UserModule };
//# sourceMappingURL=user.module.js.map