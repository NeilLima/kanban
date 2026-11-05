var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsNotEmpty, IsOptional, } from 'class-validator';
export class CreateColumnDto {
    name;
    color;
    projectId;
}
__decorate([
    IsString(),
    IsNotEmpty({ message: 'Nome da coluna é obrigatório' }),
    __metadata("design:type", String)
], CreateColumnDto.prototype, "name", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CreateColumnDto.prototype, "color", void 0);
__decorate([
    IsString(),
    IsNotEmpty({ message: 'projectId é obrigatório' }),
    __metadata("design:type", String)
], CreateColumnDto.prototype, "projectId", void 0);
export class UpdateColumnDto {
    name;
    color;
}
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], UpdateColumnDto.prototype, "name", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], UpdateColumnDto.prototype, "color", void 0);
//# sourceMappingURL=column.dto.js.map