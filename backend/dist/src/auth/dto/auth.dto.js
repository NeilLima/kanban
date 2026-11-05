var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
export class LoginDto {
    email;
    password;
}
__decorate([
    IsEmail({}, { message: 'E-mail inválido' }),
    IsNotEmpty({ message: 'E-mail é obrigatório' }),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    IsString(),
    IsNotEmpty({ message: 'Senha é obrigatória' }),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
export class RegisterDto {
    email;
    password;
    firstName;
    lastName;
    countryIso2;
    stateIso2;
    city;
    birthDate;
    gender;
}
__decorate([
    IsEmail({}, { message: 'E-mail inválido' }),
    IsNotEmpty({ message: 'E-mail é obrigatório' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    IsString(),
    MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres' }),
    IsNotEmpty({ message: 'Senha é obrigatória' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    IsString(),
    IsNotEmpty({ message: 'Nome é obrigatório' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "firstName", void 0);
__decorate([
    IsString(),
    IsNotEmpty({ message: 'Sobrenome é obrigatório' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "lastName", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], RegisterDto.prototype, "countryIso2", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], RegisterDto.prototype, "stateIso2", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], RegisterDto.prototype, "city", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], RegisterDto.prototype, "birthDate", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], RegisterDto.prototype, "gender", void 0);
//# sourceMappingURL=auth.dto.js.map