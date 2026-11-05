var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { AuthRepository } from '../repository/auth.repository';
let AuthService = class AuthService {
    authRepository;
    jwtService;
    configService;
    constructor(authRepository, jwtService, configService) {
        this.authRepository = authRepository;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async register(dto) {
        const existing = await this.authRepository.findUserByEmail(dto.email);
        if (existing) {
            throw new ConflictException('E-mail já está em uso');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const birthDate = dto.birthDate ? new Date(dto.birthDate) : null;
        const user = await this.authRepository.createUser({
            email: dto.email,
            password: hashedPassword,
            username: null,
            profile: {
                firstName: dto.firstName,
                lastName: dto.lastName,
                countryIso2: dto.countryIso2 ?? null,
                stateIso2: dto.stateIso2 ?? null,
                city: dto.city ?? null,
                birthDate,
                gender: dto.gender ?? null,
            },
        });
        const token = this.generateToken(user.id, user.email);
        return { user, token };
    }
    async login(dto) {
        const user = await this.authRepository.findUserByEmail(dto.email);
        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas');
        }
        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciais inválidas');
        }
        const token = this.generateToken(user.id, user.email);
        return { user, token };
    }
    generateToken(userId, email) {
        const payload = { sub: userId, email };
        const options = {
            secret: this.configService.get('jwt.secret'),
            expiresIn: this.configService.get('jwt.expiresIn'),
        };
        return this.jwtService.sign(payload, options);
    }
};
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AuthRepository,
        JwtService,
        ConfigService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map