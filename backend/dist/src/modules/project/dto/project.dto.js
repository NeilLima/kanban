var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsInt, Min, } from 'class-validator';
export class CreateProjectDto {
    name;
    description;
    color;
    icon;
}
__decorate([
    IsString(),
    IsNotEmpty({ message: 'Nome do projeto é obrigatório' }),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "name", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "description", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "color", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "icon", void 0);
export class UpdateProjectDto {
    name;
    description;
    color;
    icon;
    isFavorite;
    isArchived;
}
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "name", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "description", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "color", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "icon", void 0);
__decorate([
    IsBoolean(),
    IsOptional(),
    __metadata("design:type", Boolean)
], UpdateProjectDto.prototype, "isFavorite", void 0);
__decorate([
    IsBoolean(),
    IsOptional(),
    __metadata("design:type", Boolean)
], UpdateProjectDto.prototype, "isArchived", void 0);
export class CreateColumnDto {
    name;
    color;
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
export class UpdateColumnDto {
    name;
    color;
    order;
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
__decorate([
    IsInt(),
    Min(0),
    IsOptional(),
    __metadata("design:type", Number)
], UpdateColumnDto.prototype, "order", void 0);
//# sourceMappingURL=project.dto.js.map